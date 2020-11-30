var express = require('express');
var router = express.Router();
const db = require('../models/index');
const {Op} = require('sequelize');

router.get('/', (req, res, next) => {
  db.Articles.findAll()
  .then(articles => {
    var data = {
      title: 'Articles',
      content: articles
    }
    res.render('articles/index', data);
  });
});

module.exports = router;
