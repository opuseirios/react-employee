const express = require('express')
const router = express.Router();
const Chat = require('../models/chat')

router.get('/list', (req, res) => {
  const {userid} = req.cookies;
  if(!userid){
    return res.json({
      code:1,
      msg:'没有此用户'
    })
  }
  Chat.find({}).then(doc=>{
    return res.json({
      code:0,
      data:doc
    })
  })
})

module.exports = router;