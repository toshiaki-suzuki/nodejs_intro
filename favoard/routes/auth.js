const express = require('express');
const router = express.Router();
const db = require('../models/index');
const bcrypt = require('bcrypt');

const validationChecks = [
  check('name').isLength({ max: 64 }).withMessage('must be at most 64 chars long')
              .not().isEmpty().withMessage('is required'),
  check('mail').isEmail().withMessage('must be in the form of an email'),
  check('password').isLength({ min: 8, max: 32 }).withMessage('must be at least 5 and at most 32 chars long')
];

router.get('/signup', function(req, res, next) {
  const data = {
    title: 'Sign Up',
    name: '',
    mail: '',
    password: ''
  };
  res.render('auth/signup', data);
});

router.post('/signup', validationChecks, function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const data = {
      name: req.body.name,
      mail: req.body.mail,
      password: req.body.password,
      errors: errors.array()
    };
    db.Users.create({
      id: uuidv4(),
      name: req.body.name,
      mail: req.body.mail,
      password: req.body.password,
      createdAt: new Date(),
    }).then(usr => res.redirect(`/articles`));
  }
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
      req.session.regenerate((err) => {
        req.session.userId = usr.id;
        res.redirect('/articles');
      });
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