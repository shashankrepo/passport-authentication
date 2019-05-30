const router = require('express').Router();
const User = require('../model/User');
const validateUser = require('../validation/user');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));

router.post('/register', async (req, res) => {
  const { name, email } = req.body;

  const userData = _.pick(req.body, ['name', 'email', 'password']);

  const { error } = validateUser(userData);

  if (error) return res.render('register', { error, name, email });

  //if (error) return res.status(400).send(error.details[0].message);

  if (req.body.password !== req.body.password2)
    return res.render('register', {
      error: { details: [{ message: 'Password do not match' }] },
      name,
      email
    });

  const isExist = await User.findOne({ email: email });
  if (isExist)
    return res.render('register', {
      error: { details: [{ message: 'Email is already registered' }] },
      name,
      email
    });

  const user = new User({
    ...userData
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  res.redirect('/user/login');
});

module.exports = router;
