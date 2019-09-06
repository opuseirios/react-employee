const express = require('express')
const router = express.Router();
const Chat = require('../models/chat')
const User = require('../models/user')

router.get('/list', (req, res) => {
  const {userid} = req.cookies;
  if(!userid){
    return res.json({
      code:1,
      msg:'没有此用户'
    })
  }
  User.find({}).then(userDoc=>{
    let users = {};
    userDoc.forEach(v=>{
      users[v._id] = {name:v.user,avatar:v.avatar}
    })
    Chat.find({'$or':[{from:userid},{to:userid}]}).then(msgs=>{
      return res.json({
        code:0,
        msgs:msgs,
        users:users
      })
    })
  })
})

module.exports = router;