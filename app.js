require('dotenv').config();
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { request } = require("http");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {


  const query = req.body.cityName;
  const apiKey = process.env.APIKEY;
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +query +"&appid=" +apiKey +"&units=" +units +" ";

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const des = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      // res.write(icon);
      res.write("<h1>The temperature is " + temp + "</h1>");
      res.write("<h1>The Description is " + des + "</h1>");
      res.write("<img src=" + iconURL + "> ");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("The server is responding correctly");
});
