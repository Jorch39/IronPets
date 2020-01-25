const express = require("express");
const router = express.Router();
const User = require("../models/User");   // User model
const bcrypt         = require("bcrypt"); // BCrypt to encrypt passwords
const bcryptSalt     = 10;
const ensureLogin = require("connect-ensure-login");
const passport = require("passport");

router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));
router.post("/login", (req, res, next) => {
  const theUsername = req.body.username;
  const thePassword = req.body.password;

  if (theUsername === "" || thePassword === "") {
    res.render("auth/login", {
      errorMessage: "Please enter both, username and password to sign up."
    });
    return;
  }

  User.findOne({ "username": theUsername })
  .then(user => {
      if (!user) {
        res.render("auth/login", {
          errorMessage: "The username doesn't exist."
        });
        return;
      }
      if (bcrypt.compareSync(thePassword, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.redirect("/");
      } else {
        res.render("auth/login", {
          errorMessage: "Incorrect password"
        });
      }
  })
  .catch(error => {
    next(error);
  })
});

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    // cannot access session here
    res.redirect("/login");
  });
});

router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("private", { user: req.user });
});


/* GET signUp */
router.get('/', (req, res) => {
  console.log("auth")
  res.render('signUp/index');
});

router.get('/registerUser', (req, res) => {
  console.log("register")
  res.render('signUp/formCreateUser');
});

router.post('/registerUser' , (req,res) =>{
  console.log(req.body);
 //res.render("");
})
module.exports = router;

