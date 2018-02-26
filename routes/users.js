var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user')

/* GET users listing. */
router.get('/', UserController.findUser)
router.post('/', UserController.register)
router.post('/login', UserController.login)

module.exports = router;
