const express = require('express');
const router  = express.Router();
const Pet = require('./../models/Pet');

/* GET signUp */
// router.get('/', (req, res) => {
//   res.render('overview');
// });

router.get('/addPet', (req, res) => {
  res.render('overview/formPet');
});
router.post('/addPet', (req, res) =>{
  console.log(req.body);
  const {name , specie,age, size, sterilized} = req.body;
  const newPet =  new Pet({name, specie, age,size,sterilized});
  newPet.save()
  .then(pet =>{
    console.log("New pet added succesfully");
    res.redirect('/overview');

  })
  .catch(err => console.log(err));
})
module.exports = router;
