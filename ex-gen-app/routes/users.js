const express = require('express');
const router = express.Router();
const db = require('../models/index');
const {Op} = require('sequelize');

/* GET users listing. */
router.get('/', (req, res, next)=> {
  const nm = req.query.name;
  const ml = req.query.mail;
  db.User.findAll()
  .then(usrs => {
    var data = {
      title: 'Users/Index',
      content: usrs
    }
    res.render('users/index', data);
  })
});

router.get('/add', (req, res, next)=> {
  var data = {
    title: 'User/Add'
  }
  res.render('users/add', data);
});

router.post('/add', (req, res, next)=> {
  db.sequelize.sync()
  .then(()=> db.User.create({
    name: req.body.name,
    pass: req.body.pass,
    mail: req.body.mail,
    age: req.body.age,
  })
  .then(()=> {
    res.redirect('/users');
  })
  );
});

module.exports = router;
