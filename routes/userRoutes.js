const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");

// router.get("/", (req, res, next) => {
//   res.render("home");
// });


// router.get('/allPets', (req, res, next) => {
//   res.render('allPets');
// });

// router.get('/findPets', (req, res, next) => {
//   res.render('findPets');
// });

router.use((req, res, next) => {
  if (req.session.currentUser) { // <== if there's user in the session (user is logged in)
    next(); // ==> go to the next route ---
  } else {                          //    |
    res.redirect("/login");         //    |
  }                                 //    |
}); // ------------------------------------                                
//     | 
//     V
router.get("/overview", (req, res, next) => {
  res.render("myPetList");
});


// router.get("/overview", ensureLogin.ensureLoggedIn(), (req, res) => {
//   res.render("myPetList", { user: req.user });
// });

module.exports = router;



