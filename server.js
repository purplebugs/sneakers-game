const express = require("express");
const config = require("./config.js");

// create an express app
const app = express();

app.use("/", express.static("static"));

app.listen(8080);

console.log(
  `config.get('sneakersDatabaseKey')`,
  config.get("sneakersDatabaseKey")
);
