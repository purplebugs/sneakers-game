const fetch = require("node-fetch");
const config = require("../config.js");
const fs = require("fs");
const limit = 100;
const page = 0;

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

  console.log(
    `[APP.LOG] using sneakersDatabaseAPIKey:`,
    config.get("sneakersDatabaseAPIKey")
  );

  const response = await fetch(
    `${baseURL}/sneakers?limit=${limit}&page=${page}`,
    {
      method: "GET",
      headers: headers,
    }
  );

  if (response.status === 200 || response.status === 304) {
    const responseJSON = await response.json();

    // only use sneakers with image and price

    const sneakersWithImageAndPriceJSON = responseJSON.results.filter(
      (sneaker) => {
        const sneakerWithPrice = sneaker.retailPrice > 0;
        //console.log("[APP LOG] sneakerWithPrice", sneakerWithPrice);

        const sneakerWithImage = sneaker.image.small !== "";
        //console.log("[APP LOG] sneakerWithImage", sneakerWithImage);

        return sneakerWithPrice && sneakerWithImage;
      }
    );

    fs.writeFileSync(
      "./data/sneakersFromDatabase.json",
      JSON.stringify(sneakersWithImageAndPriceJSON, null, 2)
    );
  } else {
    throw new Error("Unable to fetch data");
  }
};

getSneakersFromDatabase();
