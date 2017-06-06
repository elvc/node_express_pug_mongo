const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Article = require('./models/article');

mongoose.connect('mongodb://localhost/nodekb');
const db = mongoose.connection;

// Check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

// Check for db errors
db.on('error', function(err){
  console.error(err);
});

const app = express();

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  Article.find({}, function(err, articles){
    if(err){
      console.error(err);
    } else {
      res.render('index', {
        title: 'Articles', 
        articles: articles
      });
    }
  });
});

// get single article
app.get('/article/:id', function(req, res){
  Article.findById(req.params.id, function(err, article){
    res.render('article', {
      article: article
    });
  });
});

// new article form
app.get('/articles/add', function(req, res){
  res.render('add_article', {
    title: 'Add Article'
  });
});

// submit new article 
app.post('/articles/add', function(req, res){
  let article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  article.save(function(err){
    if(err) {
      console.error(err);
      return;
    } else {
      res.redirect('/');
    }
  })
});

// load edit form
app.get('/article/edit/:id', function(req, res){
  Article.findById(req.params.id, function(err, article){
    res.render('edit_article', {
      title: 'Edit Article',
      article: article
    });
  });
});

// update submit new article 
app.post('/articles/edit/:id', function(req, res){
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
      res.redirect('/');
    }
  })
});

app.delete('/article/:id', function(req, res){
  let query = {_id: req.params.id};

  Article.remove(query, function(err){
    if(err) {
      console.error(err);
      return;
    } else {
      res.send('Success');
    }
  });
});

app.listen(3000, function(){
  console.log(`Server started on port 3000`);
})