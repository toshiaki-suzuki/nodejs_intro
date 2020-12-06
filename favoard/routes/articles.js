const express = require('express');
const router = express.Router();
const db = require('../models/index');
const {Op} = require('sequelize');

router.get('/', (req, res, next) => {
  db.Articles.findAll()
  .then(articles => {
    const data = {
      title: 'Articles',
      content: articles
    }
    res.render('articles/index', data);
  });
});

router.get('/:articleId', (req, res, next) => {
  const id = req.params.articleId;
  db.Articles.findAll({
    where: { id }
  }).then(article => {
    const articleData = article[0].dataValues;
    const data = {
      content: articleData
    }
    res.render('articles/article_detail', data);
  });
});

module.exports = router;
