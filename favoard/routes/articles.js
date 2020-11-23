var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('articles', {'title': 'Articles'});
});

router.get('/add', function(req, res, next) {
  res.render('articles/add', {'title': 'New Articles'});
});

module.exports = router;
