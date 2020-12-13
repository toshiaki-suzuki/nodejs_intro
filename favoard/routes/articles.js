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


router.get('/:articleId/edit', (req, res, next)=> {
  const id = req.params.articleId;
  db.Articles.findByPk(id)
  .then(article => {
    const data = {
      content: article
    }
    res.render('articles/article_edit', data);
  });
});

router.post('/:articleId/edit', (req, res, next)=> {
  const id = req.params.articleId;
  db.Articles.findByPk(id)
  .then(article => {
    article.content = req.body.content;
    article.save().then(()=>res.redirect(`/articles/${id}`));
  });
});

module.exports = router;
