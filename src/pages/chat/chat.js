import React from 'react'
import {InputItem, List, NavBar, Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import {getChatList as getList,sendMsg as send,recvMsg as recv} from "../../store/chat.redux";
import {getChatId} from "../../util";

const Item = List.Item;
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      list: []
    }
  }

  componentDidMount() {
    if(this.props.chat.chatList.length===0){
      this.props.getMsgList();
      this.props.recvMsg();
    }
  }

  handleChange(attr, value) {
    this.setState({
      [attr]: value
    })
  }

  handleSend() {
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    // socket.emit('sendmsg', {text: this.state.text})
    this.props.sendMsg({from,to,msg})
    this.setState({text: ''})
  }

  render() {
    const userid = this.props.match.params.user;
    const users = this.props.chat.users;
    if(!users[userid]){
      return null
    }
    const chatid = getChatId(userid,this.props.user._id);
    const chatList = this.props.chat.chatList.filter(v=>{
      return v.chatid === chatid;
    })
    return (
      <div id='chat-page'>
        <NavBar
          mode='dark'
          icon={<Icon type='left'/>}
          onLeftClick={()=>{
            this.props.history.go(-1);
          }}
        >
          {users[userid].name}
        </NavBar>
        {chatList.map(v => {
          const avatar = require(`../../components/img/${users[v.from].avatar}.png`);
          return v.from === userid ? (
            <List key={v._id}>
              <Item thumb={avatar}>{v.content}</Item>
            </List>
          ):(
            <List key={v._id}>
              <Item className='chat-me' extra={<img src={avatar}/>}>{v.content}</Item>
            </List>
          )
        })}
        <div className='stick-footer'>
          <List>
            <InputItem placeholder='请输入' value={this.state.text} onChange={v => this.handleChange('text', v)}
                       extra={<span onClick={() => this.handleSend()}>发送</span>}/>
          </List>
        </div>
      </div>
    );
  }
}

const mapState = (state)=>({
  chat:state.chat,
  user:state.user
})

const mapDispatch = (dispatch)=>({
  getMsgList(){
    dispatch(getList());
  },
  sendMsg({from,to,msg}){
    dispatch(send({from,to,msg}))
  },
  recvMsg(){
    dispatch(recv());
  }
})

export default connect(mapState,mapDispatch)(Chat);