const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user:{type:String,required:true},
  pwd:{type:String,required:true},
  type:{type:String,required:true},
  desc:String,
  avatar:String,
  title:String,
  meta:{
    createdAt: {
      type:Date,
      default:Date.now()
    }
  }
})

module.exports = mongoose.model('User',UserSchema);