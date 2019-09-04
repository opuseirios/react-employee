import React from 'react'
import {InputItem, List} from 'antd-mobile'
import {connect} from 'react-redux'
import {getChatList as getList,sendMsg as send,recvMsg as recv} from "../../store/chat.redux";


class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      list: []
    }
  }

  componentDidMount() {
    this.props.getMsgList();
    this.props.recvMsg();
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
    console.log({from,to,msg})
    this.props.sendMsg({from,to,msg})
    this.setState({text: ''})
  }

  render() {
    return (
      <div>
        {this.props.chat.chatList.map(v => (
          <p key={v._id}>{v.content}</p>
        ))}
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