import React from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'

const Item = List.Item;
const Brief = Item.Brief

class Msg extends React.Component{
  getLast(arr){
    return arr[arr.length-1]
  }
  render(){
    const msgGroup = {};
    const userid = this.props.user._id;
    const userinfo = this.props.chat.users;
    this.props.chat.chatList.forEach(v=>{
      msgGroup[v.chatid] = msgGroup[v.chatid]||[];
      msgGroup[v.chatid].push(v);
    })
    const chatList = Object.values(msgGroup).sort((a,b)=>{
      const a_create_time = this.getLast(a).meta.created_time.getTime();
      const b_create_time = this.getLast(b).meta.created_time.getTime();
      return a_create_time - b_create_time
    });
    console.log(chatList);
    return(
      <div>
        <List>
          {chatList.map(v=>{
            const lastItem = this.getLast(v);
            const targetId = v[0].from===userid?v[0].to:v[0].from;
            const unreadNum = v.filter(v=>!v.read&&v.to===userid).length
            return(
              <Item
                extra={<Badge text={unreadNum}></Badge>}
                key={lastItem._id}
                thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                arrow='horizontal'
                onClick={()=>{
                  this.props.history.push(`/chat/${targetId}`)
                }}
              >
                {lastItem.content}
                <Brief>{userinfo[targetId].name}</Brief>
              </Item>
            )
          })}
        </List>
      </div>
    )
  }
}

const mapState = (state)=>({
  chat:state.chat,
  user:state.user
})

const mapDispatch = (dispatch)=>({

})

export default connect(mapState,mapDispatch)(Msg)