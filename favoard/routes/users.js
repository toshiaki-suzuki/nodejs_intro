const express = require('express');
const router = express.Router();
const db = require('../models/index');
const {Op} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');

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
  res.render('users/user_create', {errors: {}});
});

router.post('/create', [
  body('name').isLength({ max: 64 }),
  body('mail').isEmail(),
  body('password').isLength({ min: 8, max: 32 })
], (req, res, next)=> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('users/user_create', { errors: errors.array() });
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
      content: usr
    }
    res.render('users/user_edit', data);
  });
});

router.post('/:userId/edit', (req, res, next)=> {
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

