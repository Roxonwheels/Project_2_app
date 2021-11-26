const router = require("express").Router();
const chalk = require("chalk");
const axios = require("axios");

const Character = require("../models/Character.model");
const User = require("../models/User.model");


const {isLoggedIn} = require("../middleware/route-gard")



router.get("/", isLoggedIn, async (req,res) =>{
  try {
    const axiosCall = await axios( `http://api.disneyapi.dev/characters`)
    disneyCharacters = axiosCall.data.data

    res.render("./characters.hbs", {disneyCharacters})
  }
  catch(err){
    console.log(err)
  }
})


// /* GET home page */
// router.get("/character", (req, res, next) => {
//   res.render("index");
// });

module.exports = router;
