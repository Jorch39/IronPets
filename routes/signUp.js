const express = require('express');
const router  = express.Router();

/* GET signUp */
router.get('/logIn', (req, res, next) => {
  res.render('signUp');
});
