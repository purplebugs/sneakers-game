const fetch = require("node-fetch");
const config = require("../config.js");
const fs = require("fs");

// get key
const baseURL = "https://the-sneaker-database.p.rapidapi.com";

const headers = {
  "x-rapidapi-key": config.get("sneakersDatabaseAPIKey"),
  "x-rapidapi-host": "the-sneaker-database.p.rapidapi.com",
};

// Fetch shoes from https://rapidapi.com/tg4-solutions-tg4-solutions-default/api/the-sneaker-database

const getSneakersFromDatabase = async () => {
  // respond with limit and page of sneakers when a GET request is made to /api/:limit/:page
  // send in /api/100/0 to return first 100 sneakers

  const response = await fetch(`${baseURL}/sneakers?limit=100&page=0`, {
    method: "GET",
    headers: headers,
  });

  if (response.status === 200 || response.status === 304) {
    const responseJSON = await response.json();

    // TODO filter only use sneakers with image and price
    fs.writeFileSync(
      "./data/sneakersFromDatabase.json",
      JSON.stringify(responseJSON, null, 2)
    );
  } else {
    throw new Error("Unable to fetch data");
  }
};

getSneakersFromDatabase();
