var express = require('express');
var router = express.Router();
const db = require('../models/index');
const {Op} = require('sequelize');

router.get('/', function(req, res, next) {
  db.Users.findAll()
  .then(usrs => {
    var data = {
      title: 'Users',
      content: usrs
    }
    res.render('users/index', data);
  });
});

router.get('/:userId', (req, res, next) => {
  const id = req.params.userId;
  db.Users.findAll({
    where: { id }
  }).then(usr => {
    console.log(usr);
    const userData = usr[0].dataValues;
    var data = {
      content: userData
    }
    res.render('users/user_detail', data);
  });
});
module.exports = router;
