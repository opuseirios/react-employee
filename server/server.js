const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const router = require('./routes')

const app = express();

//链接mongoose
mongoose.connect('mongodb://localhost:27017/employee');

app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

router(app);

app.listen(9000,()=>{
  console.log('端口监听9000')
})