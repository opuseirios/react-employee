import React from 'react'
import {NavBar} from 'antd-mobile'
import {connect} from 'react-redux'
import {withRouter,Switch,Route} from 'react-router-dom'
import NavLink from '../navLink/navLink'
import Boss from '../boss/boss'
import Genius from '../genius/genius'

function Msg() {
  return <h2>消息列表</h2>
}

function User() {
  return <h2>个人中心</h2>
}

class DashBoard extends React.Component{
  render(){
    const {pathname} = this.props.location;
    const user = this.props.user;
    const navList = [
      {
        path:'/boss',
        text:'牛人',
        icon:'boss',
        title:'牛人列表',
        component:Genius,
        hide:user.type === 'genius'
      },
      {
        path:'/genius',
        text:'Boss',
        icon:'job',
        title:'Boss列表',
        component:Boss,
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
        <NavLink data={navList} />
      </div>
    )
  }
}

const mapState = (state)=>({
  user:state.user
})

const mapDispatch = (dispatch)=>({

})

export default withRouter(connect(mapState,mapDispatch)(DashBoard))