const Articles = require('../models/article')
const jwt = require('jsonwebtoken')

class ArticleController {
  static getAllArticles (req, res) {
    Articles.find()
      .then(result => {
        res.status(200).json({
          articles: result
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          err: err
        })
      })
  }
  
  static postArticle (req, res) {
    if(req.body.token){
      let decoded = jwt.verify(req.body.token, process.env.SECRET_KEY)
      console.log(decoded);
      let newArticle = new Articles ({
        title: req.body.title,
        longContent: req.body.longContent,
        shortContent: req.body.shortContent,
        userId: decoded.id,
        author: decoded.email
      })
      newArticle.save()
      .then(artic => {
        res.status(200).json({
          msg: 'new article created',
          data: artic
        })
      })
      .catch(err => {
        res.status(500).json({
          err: err
        })
      })  
    }
    else if(req.body.userId) {
      let newArticle = new Articles ({
        title: req.body.title,
        longContent: req.body.longContent,
        shortContent: req.body.shortContent,
        userId: req.body.userId,
        author: req.body.user
      })
      newArticle.save()
      .then(artic => {
        res.status(200).json({
          msg: 'new article created',
          data: artic
        })
      })
      .catch(err => {
        res.status(500).json({
          err: err
        })
      })
    }
  }
  
  static findArticle (req, res) {
    Articles.findById(req.params.id) 
      .then(resp => {
        res.status(200).json({
          article: resp
        })
      })
      .catch(err => {
        res.status(500).json({
          msg: 'article not found'
        })
      })
    
  }
  
  static removeArticle (req, res) {
    Articles.remove({_id: req.params.id})
    .then(result => {
      res.status(200).json({
        msg: 'article deleted',
        data: result
      })
    })
    .catch(err => {
      res.status(500).json({
        err: err
      })
    })
  }
}

module.exports = ArticleController;