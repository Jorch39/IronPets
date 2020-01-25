const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/petList', (req, res, next) => {
  res.render('petList');
});

module.exports = router;
