import React from 'react'
import UserCard from '../userCard/userCard'
import {connect} from 'react-redux'
import {getUserList} from "../../store/chatuser.redux";

class Boss extends React.Component {
  componentDidMount() {
    this.props.getGenius('genius')
  }

  render() {
    return (
      <UserCard data={this.props.userList}/>
    )
  }
}

const mapState = (state) => ({
  userList: state.chatUser.userList
})

const mapDispatch = (dispatch) => ({
  getGenius(type) {
    dispatch(getUserList(type))
  }
})

export default connect(mapState, mapDispatch)(Boss)