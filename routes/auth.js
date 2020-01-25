const express = require('express');
const router  = express.Router();

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
/* app.post('/petsInfo' , (req, res) =>{
  console.log(req.body);
  registerPet(req.body);
   res.render("index")
   
}) */