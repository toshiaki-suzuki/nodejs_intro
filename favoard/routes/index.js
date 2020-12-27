var express = require('express');
var router = express.Router();
const db = require('../models/index');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Favoard' });
});

router.get('/signup', function(req, res, next) {
  const data = {
    title: 'Sign Up',
    name: '',
    mail: '',
    password: ''
  };
  res.render('signup', data);
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
  res.render('signin', data);
});

router.post('/signin', function(req, res, next) {
  const mail = req.body.mail;
  const password = req.body.password;
  db.Users.findOne({ where: { mail: mail } })
  .then(usr => {
    if (password === usr.password) {
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
      res.render('signin', data);
    }
  });
  
});

module.exports = router;
