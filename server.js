const express = require("express");
const fetch = require("node-fetch");
const fs = require("fs");
const utils = require("./src/utils.js");
const bodyParser = require("body-parser");

// load shoe data - see Readme to generate this data if this is the first time running the app
const data = JSON.parse(fs.readFileSync("./data/sneakersFromDatabase.json"));

const mappedData = new Map();
data.forEach((sneaker) => {
  mappedData.set(sneaker.id, sneaker);
});

console.log(
  "mappedData.get('7021d9e7-afca-4564-8438-bac1f7b22c99')",
  mappedData.get("7021d9e7-afca-4564-8438-bac1f7b22c99")
);

const hasData = Array.isArray(data) && data.length > 0;

// create application/json parser
const jsonParser = bodyParser.json();

// create an express app
const app = express();

// respond with friendly message when a GET request is made to the homepage
app.get("/api", function (req, res) {
  res.send(
    `👟 Welcome to The Sneakers Guessing Game API. Created using https://rapidapi.com/tg4-solutions-tg4-solutions-default/api/the-sneaker-database`
  );
});

// eg: send in /api/randomShoes/2 to return 2 random shoes as an array
app.get("/api/randomShoes/:howMany", async (req, res) => {
  const numberOfShoes = data.length;
  const howMany =
    req.params.howMany !== undefined ? req.params.howMany : (howMany = 1);

  // returns a random integer from 0 to numberOfShoes-1
  const randomShoeIndex = Math.floor(Math.random() * numberOfShoes);

  const dataSelected = data.slice(
    randomShoeIndex,
    parseInt(randomShoeIndex) + parseInt(howMany)
  );

  // TODO return only id, name, image
  res.send(JSON.stringify(dataSelected));
});

// respond with limit and page of sneakers when a GET request is made to /api/:limit/:page
// eg: send in /api/10/0 to return first 10 sneakers as an array
app.get("/api/:limit/:page", async (req, res) => {
  if (!hasData) {
    throw new Error(
      "No data - see Readme to generate this data if this is the first time running the app"
    );
  }

  const limit = req.params.limit; // how many to return
  const page = req.params.page; // from which page to start
  const start = page !== 0 ? page * limit : 0; // calculation of which index to start from
  const end = parseInt(start) + parseInt(limit);

  const dataSelected = data.slice(start, end);

  res.send(JSON.stringify(dataSelected));
});

// POST /api/compare {idA: id, idB: id, selected: id}
app.post("/api/compare/", jsonParser, function (req, res) {
  // Example request body
  // {
  //     "idA": "1deddc2f-eb10-4a58-b0c6-5880e68e084d",
  //     "idB": "098a95ad-6b19-4e95-8955-d1fa7d4a087f",
  //     "selected": "1deddc2f-eb10-4a58-b0c6-5880e68e084d"
  // }

  // fish out values in body and send sneaker object to utils.compare()
  const sneakerA = mappedData.get(req.body.idA);
  const sneakerB = mappedData.get(req.body.idB);

  // compare prices and send response
  res.send(JSON.stringify(utils.compare(sneakerA, sneakerB)));
});

app.use("/", express.static("static"));

app.listen(8080);
