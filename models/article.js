const mongoose = require('mongoose');

// Article schema
const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

const Article = module.exports = mongoose.model('Article', articleSchema);