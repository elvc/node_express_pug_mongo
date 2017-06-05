const express = require('express');
const path = require('path');

const app = express();

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  let articles = [
    {
      id: 1,
      title: 'Article 1',
      author: 'Elvis Chan',
      body: 'This is article one'
    },
    {
      id: 2,
      title: 'Article 2',
      author: 'John Doe',
      body: 'This is article two'
    },
    {
      id: 3,
      title: 'Article 3',
      author: 'Pete Smith',
      body: 'This is article three'
    },
  ];
  res.render('index', {
    title: 'Articles', 
    articles: articles
  });
});

app.get('/articles/add', function(req, res){
  res.render('add_article', {
    title: 'Add Article'
  });
});

app.listen(3000, function(){
  console.log(`Server started on port 3000`);
})