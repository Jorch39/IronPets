const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  Pet.findOne({})
  .then(petImage => {

  })
  .catch(error => {
    next(error);
  })

  res.render('index');
});

module.exports = router;


