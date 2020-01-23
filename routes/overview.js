const express = require('express');
const router  = express.Router();

/* GET signUp */
router.get('/', (req, res) => {
  res.render('overview');
});
router.get('/addPet', (req, res) => {
  res.render('overview/formPet');
});
router.post('/addPet', (req, res) =>{
  console.log(req.body);
  res.redirect('/overview');
})
module.exports = router;
