const mongoose = require('mongoose')

const Schema = mongoose.Schema;

let articleSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    longContent     : String,
    shortContent: String,
    userId      :[{
        type    : Schema.Types.ObjectId,
        ref     : 'UserBlog'
    }],
    author: String
})

const Article = mongoose.model('ArticleBlog',articleSchema)

module.exports = Article;