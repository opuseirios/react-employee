import React from 'react'
import {NavBar} from 'antd-mobile'
import {connect} from 'react-redux'
import {withRouter,Switch,Route} from 'react-router-dom'
import NavLink from '../navLink/navLink'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import Msg from '../msg/msg'
import {getChatList as getList,sendMsg as send,recvMsg as recv} from "../../store/chat.redux";


class DashBoard extends React.Component{
  componentDidMount() {
    if(this.props.chat.chatList.length===0){
      this.props.getMsgList();
      this.props.recvMsg();
    }
  }
  render(){
    const {pathname} = this.props.location;
    const user = this.props.user;
    const navList = [
      {
        path:'/boss',
        text:'牛人',
        icon:'boss',
        title:'牛人列表',
        component:Boss,
        hide:user.type === 'genius'
      },
      {
        path:'/genius',
        text:'Boss',
        icon:'job',
        title:'Boss列表',
        component:Genius,
        hide:user.type === 'boss'
      },
      {
        path:'/msg',
        text:'消息',
        icon:'msg',
        title:'消息列表',
        component:Msg,
      },
      {
        path:'/me',
        text:'我',
        icon:'user',
        title:'个人中心',
        component:User
      }
    ]
    return(
      <div>
        <NavBar className='fixed-header' mode='dark'>{navList.find(v=>v.path === pathname).title}</NavBar>
        <div>
           <Switch>
             {
               navList.map(v=>(
                 <Route key={v.path} path={v.path} component={v.component} ></Route>
               ))
             }
           </Switch>
        </div>
        <NavLink data={navList} chat={this.props.chat} />
      </div>
    )
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

export default withRouter(connect(mapState,mapDispatch)(DashBoard))