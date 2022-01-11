const router = require("express").Router();
const chalk = require("chalk");
const axios = require("axios");

const Character = require("../models/Character.model");
const User = require("../models/User.model");


const {isLoggedIn} = require("../middleware/route-gard")



router.get("/", isLoggedIn, async (req,res) =>{
  try {
    const axiosCall = await axios( `http://api.disneyapi.dev/characters?page=2`) 
    // const axiosCall = await axios(`https://api.disneyapi.dev/characters?page=8`)
    disneyCharacters = axiosCall.data.data

    res.render("./characters.hbs", {disneyCharacters})
  }
  catch(err){
    console.log(err)
  }
})

//create

router.post("/create/:id", async (req, res) => {
  const axiosCall = await axios(
    `http://api.disneyapi.dev/characters/${req.params.id}`
  );

  const infoDisneyCharacter = axiosCall.data;

  const dataToUpload = {
    name: infoDisneyCharacter.name,
    films: [...infoDisneyCharacter.films],
    tvShows: [...infoDisneyCharacter.tvShows],
    imageUrl: infoDisneyCharacter.imageUrl,
  };

  const justCreatedCharacter = await Character.create(dataToUpload);

  await User.findByIdAndUpdate(
    req.session.loggedUser._id,
    { $push: { favorites: justCreatedCharacter._id } },
    { new: true }
  );

  res.redirect('/favorites')
});


// delete



router.post('/favorites/:id/delete', async (req, res) => {

  try {
    await User.findByIdAndUpdate(req.session.user._id, {
      $pull: { favorites: req.params.id},
    })

    res.redirect('/favorites')
  } catch (err) {
    console.log(err)
  }
});




module.exports = router;
