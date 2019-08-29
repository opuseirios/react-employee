import React from 'react'
import io from 'socket.io-client'
import {InputItem, List} from 'antd-mobile'

const socket = io('ws://localhost:9000');


class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      list: []
    }
  }

  componentDidMount() {
    const self = this;
    socket.on('recvmsg', function (data) {
      self.setState({
        list: [...self.state.list, data.text]
      })
    })
  }

  handleChange(attr, value) {
    this.setState({
      [attr]: value
    })
  }

  handleSend() {
    socket.emit('sendmsg', {text: this.state.text})
    this.setState({text: ''})
  }

  render() {
    return (
      <div>
        {this.state.list.map(v => (
          <p key={v}>{v}</p>
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

export default Chat;