const express = require("express");
const router = express.Router();
const bcrypt         = require("bcrypt"); // BCrypt to encrypt passwords
const bcryptSalt     = 10;
const ensureLogin = require("connect-ensure-login");
const nodemailer = require('nodemailer')
const uploadCloud = require('../config/cloudinary.js');
const passport     = require("passport");


//Models
const User = require("../models/User");   // User model
const Pet = require("../models/Pet");


router.get("/", (req, res, next) => {
  Pet.find()
  .then(allPets =>{
    const chosenPets = [];
    chosenPets.push(allPets.splice(Math.floor(Math.random()*allPets.length), 1)[0])
    chosenPets.push(allPets.splice(Math.floor(Math.random()*allPets.length), 1)[0])
    chosenPets.push(allPets.splice(Math.floor(Math.random()*allPets.length), 1)[0])
    
    res.render('index', {user: req.session.user, chosenPets})
    //console.log(allPets)
  })
});


router.get('/allPets', (req, res, next) => {
  Pet.find()
  .then(allPets =>{

    res.render('allPets', {user: req.session.user, allPets : allPets})
    //console.log(allPets)

  })
});

router.get('/allPets/:id', (req, res, next) => {

  console.log("detail pet")
  Pet.findById(req.params.id)
  .populate("shelter")
  .then(pet =>{

    console.log(pet);
    res.render('detail-pet', {user: req.session.user, petDetails : pet})

  })
  .catch(err => console.log(err))
});
router.post('/send-email', (req, res, next) => {
  let { email, emailShelter,phone,subject, message } = req.body;
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

/* router.post('/send-email', (req, res, next) => {
  let { email,emailShelter, phone,subject, message } = req.body;
  console.log(email);
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
 */
router.get('/findPets', (req, res, next) => {

 // res.render('findPets', {user: req.session.user});

  User.find({ "role":"Refugio"})
  .then(userRefugio =>{
    res.render('findPets', {user: req.session.user, listRefugio : userRefugio})
  })
  .catch(err =>{console.log(err)});
 

});

//SignUp
router.get("/signup2", (req, res, next) => {
  res.render("signUp2", {user: req.session.user});
});

router.post("/signup2", (req, res, next) => {
  let location = {
    type: req.body.direction,
    coordinates: [req.body.lat, req.body.lng]

    };
    
  const {name, lastname,email,phone,password,role} = req.body;
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
        const newUser = new User ({name, lastname,email, phone, role, location,password: hashPass});
        newUser.save()
        .then((newUSer) => {
          res.redirect("/overview");
        })
        .catch(error => {
          console.log(error);
        })
      }else{
        const newUser = new User ({name, lastname,email, phone, role:"ironSaver",password: hashPass});
        newUser.save()
        .then((newUSer) => {
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
  res.render("login", { user: req.session.user, "message": req.flash("error") });
});

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
//* este me redirecciona a overview 
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
  const newPet =  new Pet({name, specie, age, size,sterilized, status:"Disponible", petPath, petImgName, shelter:user.id});
   newPet.save()
  .then(pet =>{
    console.log("New pet succefully added");
    res.redirect('/overview');

  })
  .catch(err => console.log(err)); 
})

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    // cannot access session here
    res.redirect("/login");
  });
});





module.exports = router;