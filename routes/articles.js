var express = require('express');
var router = express.Router();
const articleController = require('../controllers/articles')

router.get('/', articleController.getAllArticles)
router.post('/', articleController.postArticle)
router.get('/:id', articleController.findArticle)
router.delete('/:id', articleController.removeArticle)

module.exports = router;
