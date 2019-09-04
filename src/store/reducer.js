import {combineReducers} from 'redux'
import {userReducer} from "./user.redux";
import {chatUserReducer} from "./chatuser.redux";
import {chatReducer} from "./chat.redux";

export default combineReducers({
  user: userReducer,
  chatUser: chatUserReducer,
  chat:chatReducer
})