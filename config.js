const convict = require("convict");

// Define a schema
const config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  sneakersDatabaseKey: {
    doc: "The API key for the sneakers database",
    format: String,
    default: "unset",
    env: "SNEAKERS_API_KEY",
  },
});

// Load environment dependent configuration
const env = config.get("env");
config.loadFile("./config/" + env + ".json");

// Perform validation
config.validate({ allowed: "strict" });

module.exports = config;
