const express = require("express");
const router = express.Router();
const bcrypt         = require("bcrypt"); // BCrypt to encrypt passwords
const bcryptSalt     = 10;
const ensureLogin = require("connect-ensure-login");
const nodemailer = require('nodemailer')
const uploadCloud = require('../config/cloudinary.js');


//Models
const User = require("../models/User");   // User model
const Pet = require("../models/Pet");


router.get("/", (req, res, next) => {
  res.render("index");
});


router.get('/allPets', (req, res, next) => {
  Pet.find()
  .then(allPets =>{
    res.render('allPets', {allPets : allPets})
    //console.log(allPets)
  })
  //res.render('allPets');
});

router.get('/allPets/:id', (req, res, next) => {
  
  console.log("detail pet")
  Pet.findById(req.params.id)
  .populate("shelter")
  .then(pet =>{
    console.log(pet);
    res.render('detail-pet', {petDetails : pet})
  })
  .catch(err => console.log(err))
   /*  Pet.find()
  .then(allPets =>{
    res.render('allPets', {allPets : allPets})
    console.log(allPets)
  }) */
 
});

router.post('/send-email', (req, res, next) => {
  let { email,emailShelter, phone,subject, message } = req.body;
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'ironpetsmexico@gmail.com',
      pass: 'Iron12345678'
    }
  });
  transporter.sendMail({
    from: '"ironPets 👻" <myawesome@project.com>',
    to: emailShelter, 
    subject: subject, 
    text: message,
    html: `Alguien está interesado en tu mascota contactalo al email ${email} y al telefono ${phone}<b>${message}</b>`
  })
  .then(info => res.render('message', {email, subject, message, info}))
  .catch(error => console.log(error));
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

  if(req.session.user){
    return res.redirect('/overview');
  }
  
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
  const idUser = req.session.user.id;
  console.log(idUser)
   Pet.find({'shelter':idUser})
   .then(petList =>{
      console.log(petList);
      res.render("myPetList", {user: req.session.user , petList : petList});
   })
   .catch(err => console.log("And error ocurred x.x"))

});

router.get('/overview/addPet', (req,res) =>{
  res.render('overview/formPet', {user: req.session.user})
})

router.post('/overview/addPet', uploadCloud.single('photo'), (req,res,next) =>{
  const user= req.session.user;
  console.log(user.id);
  const {name, specie, age, size, sterilized, shelter} = req.body;
  const petPath = req.file.url;
  const petImgName = req.file.originalname;
  const newPet =  new Pet({name, specie, age, size,sterilized, status:"Disponibe", petPath, petImgName, shelter:user.id});
   newPet.save()
  .then(pet =>{
    console.log("New pet succefully added");
    res.redirect('/overview');

  })
  .catch(err => console.log(err)); 
})
router.get('/findPets', (req,res) =>{
  User.find({ "role": "Refugio" })
  .then(refugios =>{
    consolelog(refugios)
  })
  res.render('findPets');
})
router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    // cannot access session here
    res.redirect("/login");
  });
});

module.exports = router;