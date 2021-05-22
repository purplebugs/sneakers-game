const express = require("express");
const fetch = require("node-fetch");
const config = require("./config.js");

// create an express app
const app = express();

// get key
const baseURL = "https://the-sneaker-database.p.rapidapi.com";

const headers = {
  "x-rapidapi-key": config.get("sneakersDatabaseAPIKey"),
  "x-rapidapi-host": "the-sneaker-database.p.rapidapi.com",
};

const limit = 10;

// respond with friendly message when a GET request is made to the homepage
app.get("/api", function (req, res) {
  res.send(
    "👟 Welcome to The Sneakers Guessing Game API. Created using https://rapidapi.com/tg4-solutions-tg4-solutions-default/api/the-sneaker-database"
  );
});

// respond with limit and page of sneakers when a GET request is made to /api/:limit/:page
// send in /api/10/0 to return first 10 sneakers
app.get("/api/:limit/:page", async (req, res) => {
  const response = await fetch(
    `${baseURL}/sneakers?limit=${req.params.limit}&page=${req.params.page}`,
    {
      method: "GET",
      headers: headers,
    }
  );

  if (response.status === 200 || response.status === 304) {
    const responseJSON = await response.json();

    res.send(JSON.stringify(responseJSON));
  } else {
    throw new Error("Unable to fetch data");
  }
});

app.use("/", express.static("static"));

app.listen(8080);

console.log(
  `[APP.LOG] using sneakersDatabaseAPIKey:`,
  config.get("sneakersDatabaseAPIKey")
);
