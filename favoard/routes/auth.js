const express = require('express');
const router = express.Router();
const db = require('../models/index');
const bcrypt = require('bcrypt');

router.get('/signup', function(req, res, next) {
  const data = {
    title: 'Sign Up',
    name: '',
    mail: '',
    password: ''
  };
  res.render('auth/signup', data);
});

router.post('/signup', function(req, res, next) {
  res.redirect('articles');
});

router.get('/signin', function(req, res, next) {
  const data = {
    mail: '',
    password: '',
    msg: ''
  };
  res.render('auth/signin', data);
});

router.post('/signin', function(req, res, next) {
  const mail = req.body.mail;
  const password = req.body.password;
  db.Users.findOne({ where: { mail: mail } })
  .then(usr => {
    if (bcrypt.compareSync(password, usr.password)) {
      const data = {
        content: usr
      }
      res.redirect('articles');
    } else {
      const data = {
        mail: mail,
        password: '',
        msg: 'mail or password is wrong...'
      };
      res.render('auth/signin', data);
    }
  });
});

module.exports = router;