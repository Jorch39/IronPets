const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
const User = require("../models/User");   // User model


// router.get('/allPets', (req, res, next) => {
//   res.render('allPets');
// });

// router.get('/findPets', (req, res, next) => {
//   res.render('findPets');
// });

router.use((req, res, next) => {
  if (req.session.currentUser) { // <== if there's user in the session (user is logged in)
  console.log(req.session.currentUser)
    next(); // ==> go to the next route ---
  } else {                        //    |
    res.redirect("/login");         //    |
  }                                 //    |
}); // ------------------------------------                                
//     | 
//     V

router.get("/overview", (req, res , next) => {
  
    res.send(req.params.newUser)
    res.render('myPetList', {user: newUser});

});

module.exports = router;



