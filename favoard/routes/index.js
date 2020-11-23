var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Favoard' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Sign Up' });
});

router.post('/signup', function(req, res, next) {
  res.redirect('articles');
});

router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'Sign In' });
});

router.post('/signin', function(req, res, next) {
  res.redirect('articles');
});

module.exports = router;
