import {combineReducers} from 'redux'
import {userReducer} from "./user.redux";
import {chatUserReducer} from "./chatuser.redux";

export default combineReducers({
  user: userReducer,
  chatUser: chatUserReducer
})