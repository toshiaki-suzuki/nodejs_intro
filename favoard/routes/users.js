const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const db = require('../models/index');
const express = require('express');
const {Op} = require('sequelize');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const validationChecks = [
  check('name').isLength({ max: 64 }).withMessage('must be at most 64 chars long')
              .not().isEmpty().withMessage('is required'),
  check('mail').isEmail().withMessage('must be in the form of an email'),
  check('password').isLength({ min: 8, max: 32 }).withMessage('must be at least 5 and at most 32 chars long')
];

router.get('/', function(req, res, next) {
  db.Users.findAll()
  .then(usrs => {
    const data = {
      title: 'Users',
      content: usrs
    }
    res.render('users/index', data);
  });
});

router.get('/create', (req, res, next)=> {
  const data = {
    name: '',
    mail: '',
    password: '',
    errors: {}
  };
  res.render('users/user_create', data);
});

router.post('/create', validationChecks, (req, res, next)=> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const data = {
      name: req.body.name,
      mail: req.body.mail,
      password: bcrypt.hashSync(req.body.password, 10),
      errors: errors.array()
    };
    return res.render('users/user_create', data);
  }
  db.Users.create({
    id: uuidv4(),
    name: req.body.name,
    mail: req.body.mail,
    password: req.body.password,
    createdAt: new Date(),
  }).then(usr => res.redirect(`/users/${usr.id}`));
});

router.get('/:userId', (req, res, next) => {
  const id = req.params.userId;
  db.Users.findByPk(id)
  .then(usr => {
    const data = {
      content: usr
    }
    res.render('users/user_detail', data);
  });
});
module.exports = router;

router.get('/:userId/edit', (req, res, next)=> {
  const id = req.params.userId;
  db.Users.findByPk(id)
  .then(usr => {
    const data = {
      content: usr,
      errors: {}
    }
    res.render('users/user_edit', data);
  });
});

router.post('/:userId/edit', validationChecks, (req, res, next)=> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const data = {
      name: req.body.name,
      mail: req.body.mail,
      password: req.body.password,
      errors: errors.array()
    };
    return res.render('users/user_create', data);
  }
  const id = req.params.userId;
  db.Users.findByPk(id)
  .then(usr => {
    usr.name = req.body.name;
    usr.mail = req.body.mail;
    usr.password = req.body.password;
    usr.updatedAt = new Date();
    usr.save().then(()=>res.redirect(`/users/${id}`));
  });
});

module.exports = router;