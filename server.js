const express = require("express");
const fetch = require("node-fetch");
const fs = require("fs");

// load shoe data - see Readme to generate this data if this is the first time running the app
const data = JSON.parse(fs.readFileSync("./data/sneakersFromDatabase.json"));

const hasData = Array.isArray(data) && data.length > 0;

// create an express app
const app = express();

// respond with friendly message when a GET request is made to the homepage
app.get("/api", function (req, res) {
  res.send(
    "👟 Welcome to The Sneakers Guessing Game API. Created using https://rapidapi.com/tg4-solutions-tg4-solutions-default/api/the-sneaker-database"
  );
});

// respond with limit and page of sneakers when a GET request is made to /api/:limit/:page
// eg: send in /api/10/0 to return first 10 sneakers
app.get("/api/:limit/:page", async (req, res) => {
  if (!hasData) {
    throw new Error(
      "No data - see Readme to generate this data if this is the first time running the app"
    );
    return;
  }

  const limit = req.params.limit; // how many to return
  const page = req.params.page; // from which page to start
  const start = page !== 0 ? page * limit : 0; // calculation of which index to start from
  const end = parseInt(start) + parseInt(limit);

  // TODO verify enough data before slice
  const dataSelected = data.slice(start, end);

  res.send(JSON.stringify(dataSelected));
});

app.use("/", express.static("static"));

app.listen(8080);
