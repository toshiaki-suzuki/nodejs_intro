const express = require('express');
const router = express.Router();
const db = require('../models/index');
const {Op} = require('sequelize');

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
    usr.save().then(()=>res.redirect(`/users/${id}`));
  });
});

