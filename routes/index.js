const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});
router.get('/formPet' ,( req,res) =>{
  res.render('formPet')
})

module.exports = router;
