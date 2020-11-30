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
module.exports = router;
