const router = require('express').Router()
const User = require('../models/user')

//注册
router.post('/register', (req, res) => {
  const {user,pwd,repwd,type} = req.body;
   try {
     if(!user&&!pwd&&!repwd&&!type){
       return res.json({
         code:1,
         msg:'缺少参数'
       })
     }
     if(pwd!==repwd){
       return res.json({
         code:1,
         msg:'两次密码不一致'
       })
     }
     User.findOne({user}).then(u=>{
       if(u){
         return res.json({code:1,msg:'用户名重复'})
       }
       const registerUser = new User({user,pwd,type});
       registerUser.save().then(doc=>{
         if(doc){
           return res.json({code:0,msg:'注册用户成功'})
         }
       })
     })
   }catch (e) {
     res.json({
       code:1,
       message:e
     })
   }
})

//登录
router.post('/login',(req,res)=>{
  const {user,pwd} = req.body;
  if(!user||!pwd){
    return res.json({
      code:1,
      msg:'缺失参数'
    })
  }
  User.findOne({user}).then(u=>{
    if(u){
      if(u.pwd!==pwd){
        return res.json({
          code:1,
          msg:'用户名或密码错误'
        })
      }
      console.log(u);
    }else {
      return res.json({
        code:1,
        msg:'没有该用户'
      })
    }
  })
})

module.exports = router;