const express = require("express");
const https = require("https"); // A native node module to make http request(that is get request) to another server  
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    console.log("req recieved")
    const query = req.body.cityName;
    const unit = "metric";
    const appKey = ""
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid="+ appKey + "";

    https.get(url, function(response){
        console.log(response.statusCode);
    
    response.on("data", function (data) {
        weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const city = weatherData.name;
        console.log(temp);  
        const icon = weatherData.weather[0].icon;
        console.log(icon);
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        const description = weatherData.weather[0].description;
        res.write("<p>The weather condition in " + city + " is " + description + " </p>")
        res.write("<h1>The temperature in " + city + " is " + temp + " degree celcius</h1>");
        res.write("<img src = "+ imageURL+ ">");
        res.send();
    })
})
})

 



    /*Now what happened here is we send a get request via the method https.get which takes two parameters the first one is the url of the api or basically the endpoint with specific parameters(learned about APIs usme hai) and second parameter is a function which takes a object as parameter and what happen is when the data as json format(object notation) is returned by the api, this data is assigned to the object parameter of the function. 

Now we get the data in json format, we need to parse the data for that we have response.on method which takes again two inputs first is a string that is data and other is callback function which take a parameter and this parameter takes all the required useful data but if you console log this parameter you will get hexadecimal codes just like 

**********<Buffer 7b 22 63 6f 6f 72 64 22 3a 7b 22 6c 6f 6e 22 3a 38 31 2e 32 38 33 33 2c 22 6c 61 74 22 3a 32 31 2e 31 38 33 33 7d 2c 22 77 65 61 74 68 65 72 22 3a 5b ... 464 more bytes>****************

so for that we can parse this hexacodes to json format by using JSON.parse(parameter);
*/




app.listen(3000, function () {
    console.log("server started");
})




// Now istead of sending Server successfully started  I want to send the data of weather. and for that first i need to send the get request the server of API which i want to call, then i get the data and i need to parse that data and then make a message "The temperatur at Durg is xyz"