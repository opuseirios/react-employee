const router = require('express').Router()
const User = require('../models/user');
const utils = require('utility');


//注册
router.post('/register', (req, res) => {
  const {user, pwd, repwd, type} = req.body;
  try {
    if (!user && !pwd && !repwd && !type) {
      return res.json({
        code: 1,
        msg: '缺少参数'
      })
    }
    if (pwd !== repwd) {
      return res.json({
        code: 1,
        msg: '两次密码不一致'
      })
    }
    User.findOne({user}).then(u => {
      if (u) {
        return res.json({code: 1, msg: '用户名重复'})
      }
      const registerUser = new User({user, type, pwd: utils.md5(pwd)});
      registerUser.save().then(doc => {
        if (doc) {
          res.cookie('userid',doc._id);
          return res.json({code: 0, msg: '注册用户成功'})
        }
      })
    })
  } catch (e) {
    res.json({
      code: 1,
      message: e
    })
  }
})

//登录
router.post('/login', (req, res) => {
  const {user, pwd} = req.body;
  if (!user || !pwd) {
    return res.json({
      code: 1,
      msg: '缺失参数'
    })
  }
  User.findOne({user}).then(u => {
    if (u) {
      if (u.pwd !== utils.md5(pwd)) {
        return res.json({
          code: 1,
          msg: '用户名或密码错误'
        })
      }
      res.cookie('userid',u._id);
      res.json({
        code: 0,
        data: u
      })
    } else {
      return res.json({
        code: 1,
        msg: '没有该用户'
      })
    }
  })
})

//cookie的值获取info
router.get('/info', (req, res) => {
  const {userid} = req.cookies;
  if(!userid){
    return res.json({
      code:1,
      msg:'没有用户信息'
    })
  }
  User.findById({_id:userid}).then(user=>{
    if(!user){
      return res.json({
        code:1,
        msg:'没有查到用户信息'
      })
    }else {
      return res.json({
        code:0,
        data:user
      })
    }
  })
})

//信息更新
router.post('/update',(req,res)=>{
  const userid = req.cookies.userid;
  if(!userid){
    return res.json({
      code:1,
      msg:'没有用户信息'
    })
  }
  const body = req.body.data
  User.findByIdAndUpdate(userid,body).then(doc=>{
    if(!doc){
      return res.json({
        code:1,
        msg:'数据库错误'
      })
    }
    const data = Object.assign({},{
      user:doc.user,
      type:doc.type
    },body)
    return res.json({code:0,data})
  })
})

module.exports = router;