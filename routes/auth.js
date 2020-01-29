const express = require("express");
const router = express.Router();
const User = require("../models/User");   // User model
const Pet = require("../models/Pet");
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
        const newUser = new User ({name, lastname,email, phone, role, direction,password: hashPass});
     /*    User.create({
          name, 
          lastname,
          email,
          phone,
          role,
          direction,
          
        }) */
        console.log(newUSer)
        newUser.save()
        .then((newUSer) => {
          console.log(req.user)
          res.redirect("/overview");
        })
        .catch(error => {
          console.log(error);
        })
      }else{
        const newUser = new User ({name, lastname,email, phone, role,password: hashPass});

       /*  User.create({
          name, 
          lastname,
          email,
          phone,
          role,
          password: hashPass
        }) */
        newUser.save()
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
        console.log(user)
        // Save the login in the session!
        req.session.currentUser = user;
        req.session.user = {
          email: user.email,
          name: user.name,
          id: user._id
    };
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
  console.log(req.session.currentUser)
  console.log(`Inside overview: ${req.name}`)
  console.log()
  res.render("myPetList",{user: req.session.user});
});
router.get('/overview/addPet', (req,res) =>{
  res.render('overview/formPet', {user: req.session.user})
})
router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    // cannot access session here
    res.redirect("/login");
  });
});
router.post('/overview/addPet', (req,res) =>{
  const user= req.session.user;
  console.log(user.id);
  const {name , specie,age, size, sterilized,personality,
    petCharacteristicsLive, petCharmyFamily,petCharmyKids,petCharmyPets,petExcersice,petSound,petBite} = req.body;
  const newPet =  new Pet({name, specie, age,size,sterilized,personality,
    petCharacteristicsLive, petCharmyFamily,petCharmyKids,petCharmyPets,petExcersice,petSound,petBite, status:"Disponibe", petImage:"", shelter:user.id});
   newPet.save()
  .then(pet =>{
    console.log("Add new pet succefully");
    res.redirect('/overview');

  })
  .catch(err => console.log(err)); 
})

module.exports = router;



