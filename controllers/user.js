const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class UserController {
  static login (req, res) {
    User.find({
      email: req.body.email
    })
    .then(response => {
      bcrypt.compare(req.body.password, response[0].password)
      .then(resp => {
        console.log(response[0].role);
        let payload = {
          id : response[0]._id,
          email: response[0].email,
          role: response[0].role
        }
        let token = jwt.sign(payload, process.env.SECRET_KEY)
        res.status(200).json({
          token: token
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          msg: 'invalid password',
          err: err
        })
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        msg: 'username not found',
        err: err
      })
    })
  }
  
  static register (req, res) {
    if(req.body.userId){
      let newUser = new User ({
        email: req.body.user,
        password: req.body.userId
      })
      newUser.save() 
        .then(response => {
          let token = jwt.sign({email: req.body.user, id: response._id}, process.env.SECRET_KEY)
          res.status(200).json({
            token: token
          })
        })
        .catch(err => {
          console.log(err)
        })
      
    }
    else {
      let newUser = new User ({
        email: req.body.email,
        password: req.body.password
      })
      newUser.save()
      .then(response => {
        res.status(200).json({
          msg: 'new profile created',
          data: response
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          err: err
        })
      })
    }

  }
  
  static findUser (req, res) {
    let decoded = jwt.verify(req.body.token, process.env.SECRET_KEY)
    User.findById(decoded.id).populate(['articleId'])
      .then(user => {
        res.status(200).json({
          userData: user
        })
      })
      .catch(err => {
        res.status(500).json({
          err: err
        })
      })
  }
  
  
}

module.exports = UserController;