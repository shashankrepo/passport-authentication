const router = require('express').Router();
const User = require('../model/User');

router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));

router.post('/register', (req, res) => {
  res.send(req.body);
});

module.exports = router;
