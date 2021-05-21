const express = require("express");

// create an express app
const app = express();

app.use("/", express.static("static"));

app.listen(8080);
