const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

let userSchema = new Schema ({
    email    : {
      type: String,
      required: true
    },
    password    : {
      type: String,
      required: true
    },
    role : String,
    articleId : [{
      type: Schema.Types.ObjectId,
      ref: `ArticleBlog`
    }]
})

userSchema.pre('save',function(callback){
    let plainPassword = this.password
    bcrypt.hash(plainPassword,10)
    .then(hash=>{
        this.password = hash
        callback()
    })
    .catch(callback)
})

//bikin satu user super admin jgn lupa


const User = mongoose.model('UserBlog',userSchema)

module.exports = User;