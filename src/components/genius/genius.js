import React from 'react'
import UserCard from '../userCard/userCard'
import {connect} from 'react-redux'
import {getUserList} from "../../store/chatuser.redux";

class Genius extends React.Component {

  componentDidMount() {
    this.props.getBoss('boss');
  }

  render() {
    return (
      <UserCard data={this.props.userList} />
    )
  }
}

const mapState = (state)=>({
  userList:state.chatUser.userList
})

const mapDispatch = (dispatch)=>({
  getBoss(type){
    dispatch(getUserList(type))
  }
})

export default connect(mapState,mapDispatch)(Genius)