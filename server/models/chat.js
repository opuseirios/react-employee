const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  chatid: {type: String, required: true},
  from: {type: String, required: true},
  to: {type: String, required: true},
  content: {type: String, default: ''},
  created_time: {type: Date, default: Date.now()}
})

module.exports = mongoose.model('chat', ChatSchema);