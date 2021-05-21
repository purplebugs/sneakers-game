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

app.get("/api", async (req, res) => {
  const response = await fetch(`${baseURL}/sneakers?limit=${limit}`, {
    method: "GET",
    headers: headers,
  });

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
