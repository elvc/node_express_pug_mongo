const express = require('express');
const router = express.Router();

// Article model
const Article = require('../models/article');

// new article form
router.get('/add', function(req, res){
  res.render('add_article', {
    title: 'Add Article'
  });
});

// submit new article 
router.post('/add', function(req, res){
  // Express validator
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('author', 'Author is required').notEmpty();
  req.checkBody('body', 'Body is required').notEmpty();
  
  // Get errors
  let errors = req.validationErrors();

  if(errors){
    res.render('add_article', {
      title: 'Add Article',
      errors: errors
    });
  } else {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save(function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        req.flash('success', 'Article Added');
        res.redirect('/');
      }
    });
  }
});

// load edit form
router.get('/edit/:id', function(req, res){
  Article.findById(req.params.id, function(err, article){
    res.render('edit_article', {
      title: 'Edit Article',
      article: article
    });
  });
});

// update submit new article 
router.post('/edit/:id', function(req, res){
  let article = {};
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  let query = {_id: req.params.id};

  Article.update(query, article, function(err){
    if(err) {
      console.error(err);
      return;
    } else {
      req.flash('success', 'Article Updated');
      res.redirect('/');
    }
  })
});

// Delete post
router.delete('/:id', function(req, res){
  let query = {_id: req.params.id};

  Article.remove(query, function(err){
    if(err) {
      console.error(err);
      return;
    } else {
      req.flash('success', 'Article Deleted')
      res.send('Success');
    }
  });
});

// get single article
router.get('/:id', function(req, res){
  Article.findById(req.params.id, function(err, article){
    res.render('article', {
      article: article
    });
  });
});

module.exports = router;