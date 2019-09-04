const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const router = require('./routes')
const Chat = require('./models/chat')

const app = express();

//work with express
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', function (socket) {
   socket.on('sendmsg',function (data) {
     const {from,to,msg} = data;
     const chatid = [from,to].sort().join('_');
     Chat.create({chatid,from,to,content:msg}).then(doc=>{
       io.emit('recvmsg',Object.assign({},doc._doc));
     })
   })
});
//链接mongoose
mongoose.connect('mongodb://localhost:27017/employee');

app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

router(app);

server.listen(9000, () => {
  console.log('端口监听9000')
})