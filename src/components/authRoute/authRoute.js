import React from 'react'
import {connect} from 'react-redux'
import {loadData as getUserInfo} from "../../store/user.redux";
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class AuthRoute extends React.Component{
  componentDidMount(){
    const publicList = ['/login','/register'];
    const pathname = this.props.location.pathname;
    if(publicList.indexOf(pathname)>-1){
      return null;
    }
    axios.get('/user/info')
      .then(res=>{
        let data = res.data;
        if(data.code === 0){
          this.props.loadData(data.data);
        }else {
          this.props.history.push('/login')
        }
      })
  }
  render(){
    return null
  }
}

const mapState = (state)=>({
  userInfo:state.user.userInfo
})

const mapDispatch = (dispatch)=>({
  loadData(userInfo){
    dispatch(getUserInfo(userInfo))
  }
})

export default withRouter(connect(mapState,mapDispatch)(AuthRoute))