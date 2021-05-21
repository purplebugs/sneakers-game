const convict = require("convict");
const fs = require("fs");
const path = require("path");

// Define a schema
const config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test", "local"],
    default: "development",
    env: "NODE_ENV",
  },
  sneakersDatabaseAPIKey: {
    doc: "The API key for the sneakers database",
    format: String,
    default: "unset",
    env: "SNEAKERS_API_KEY",
  },
});

// Load environment dependent configuration
const env = config.get("env");

// makes it possible to make local.json which is not required
// local.json will be a file only on my computer where secrets will be stored locally
// local.json will be in .gitignore
if (fs.existsSync(path.resolve(__dirname, "./config/local.json"))) {
  config.loadFile([
    path.resolve(__dirname, "./config/", `${config.get("env")}.json`),
    path.resolve(__dirname, "./config/local.json"),
  ]);
} else {
  config.loadFile([
    path.resolve(__dirname, "./config/", `${config.get("env")}.json`),
  ]);
}

// Perform validation
config.validate({ allowed: "strict" });

module.exports = config;
