const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  Pet.find()
  .then(pImage =>{
    res.render('/allPets', {petImage : pImage})
  });

module.exports = router;
