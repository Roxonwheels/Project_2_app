const router = require("express").Router();
const User = require("../models/User.model");

const {isLoggedIn} = require("../middleware/route-gard")


router.get("/favorites",isLoggedIn, async (req, res, next) => {

  const user = await User.findById(req.session.loggedUser._id).populate('favorites')

  res.render("./favorites", {characters : user.favorites});
});




module.exports = router;
