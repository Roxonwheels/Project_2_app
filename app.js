//Middleware for .env
require("dotenv/config");

//Import Mongo connection
require("./db/index.js");

//Variables
const express = require("express");
const app = express();
const chalk = require('chalk');
const hbs = require("hbs");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGODB_URI;


//Middleware de hbs
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

//Middleware de body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Middleware para archivos estaticos
app.use(express.static(__dirname + "/public"));

// //Middleware de sessions
require("./config/session.config")(app);




// //Mongoose connect
// const connectToMongo = async () => {
//     try {
//       await mongoose.connect(MONGO_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//       });
//       console.log(chalk.bgBlue("Connected to Mongo"));
//     } catch (err) {
//       console.log(chalk.bgRed("Error:", err));
//     }
//   };
  
// connectToMongo();








const axios = require('axios')




// // ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
// require("./config")(app);

// const projectName = "test";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;
const getDisney = async () => {
    app.locals.response =  await axios.get('http://api.disneyapi.dev/characters')
app.locals.disney = app.locals.response.data.data;
// console.log(app.locals.response.data.data)
}

getDisney();
const index = require("./routes/index");
app.use("/", index);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

require("./error-handling")(app);

module.exports = app;





//App listener
app.listen(PORT, () => {
    console.log(chalk.bgGreen(`Server running in port ${PORT}`));
  });