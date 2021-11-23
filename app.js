//Middleware for .env
require("dotenv/config");
require("./db");
const express = require("express");
const axios = require('axios')
// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const projectName = "test";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;
const getDisney = async () => {
app.locals.response =  await axios.get('http://api.disneyapi.dev/characters')
app.locals.disney = app.locals.response.data.data;
console.log(app.locals.response.data.data)
}
getDisney();
// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
