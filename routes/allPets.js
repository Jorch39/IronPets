const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/allPets', (req, res, next) => {
  res.render('allPets');
});

module.exports = router;
