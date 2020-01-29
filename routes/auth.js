const express = require("express");
const router = express.Router();
const User = require("../models/User");   // User model
const bcrypt         = require("bcrypt"); // BCrypt to encrypt passwords
const bcryptSalt     = 10;
const ensureLogin = require("connect-ensure-login");


router.get("/", (req, res, next) => {
  res.render("index");
});


router.get('/allPets', (req, res, next) => {
  res.render('allPets');
});

router.get('/findPets', (req, res, next) => {
  res.render('findPets');
});

//SignUp
router.get("/signup2", (req, res, next) => {
  res.render("signUp2");
});

router.post("/signup2", (req, res, next) => {
  const {name, lastname,email,phone,password,role,direction} = req.body;
  console.log(req.body);
  const salt     = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  if (email === "" || password === "") {
    res.render("signUp2", {
      errorMessage: "Indicate an email and a password to sign up"
    });
    return;
  }
    
  User.findOne({ "email": email })
  .then(user => {
    if (user !== null) {
        res.render("signUp2", {
          errorMessage: "The email already exists!"
        });
        return;
      }
      if(role==="Refugio"){
        User.create({
          name, 
          lastname,
          email,
          phone,
          role,
          direction,
          password: hashPass
        })
        .then(() => {
          res.redirect("/overview");
        })
        .catch(error => {
          console.log(error);
        })
      }else{
        User.create({
          name, 
          lastname,
          email,
          phone,
          role,
          password: hashPass
        })
        .then(() => {
          res.redirect("/overview");
        })
        .catch(error => {
          console.log(error);
        })
      }
      
  })
  .catch(error => {
    next(error);
  });
});

//Login
router.get("/login", (req, res, next) => {
  res.render("login", { "message": req.flash("error") });
});

// router.get("/login", (req, res, next) => {
//   res.render("login");
// });

// router.post("/login", passport.authenticate("local", {
//   successRedirect: "/",
//   failureRedirect: "/login",
//   failureFlash: true,
//   passReqToCallback: true
// }));

router.post("/login", (req, res, next) => {
  const theEmail = req.body.email;
  const thePassword = req.body.password;

  if (theEmail === "" || thePassword === "") {
    res.render("login", {
      errorMessage: "Please enter both, email and password to sign up."
    });
    return;
  }

  User.findOne({ "email": theEmail })
  .then(user => {
      if (!user) {
        res.render("login", {
          errorMessage: "The email doesn't exist."
        });
        return;
      }
      if (bcrypt.compareSync(thePassword, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.redirect("/overview");
      } else {
        res.render("login", {
          errorMessage: "Incorrect password"
        });
      }
  })
  .catch(error => {
    next(error);
  })
});



// router.get("/overview", ensureLogin.ensureLoggedIn(), (req, res) => {
//   res.render("myPetList", { user: req.user });
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

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    // cannot access session here
    res.redirect("/login");
  });
});

module.exports = router;



