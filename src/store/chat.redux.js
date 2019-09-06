import axios from 'axios'

import io from 'socket.io-client'

const socket = io('ws://localhost:9000');


//constants
const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';
const MSG_READ = 'MSG_READ';

//reducer
const defaultState = {
  chatList: [],
  users: [],
  unread: 0
}

export const chatReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        chatList: action.payload.msgs,
        users: action.payload.users,
        unread: action.payload.msgs.filter(v => !v.read && v.to === action.userid).length
      };
    case MSG_RECV:
      const n = action.userid === action.payload.to ? 1 : 0
      return {...state, chatList: [...state.chatList, action.payload], unread: state.unread + n};
    case MSG_READ:
      return state;
    default:
      return state;
  }
}

//actionCreators
export function getChatList() {
  return (dispatch, getState) => {
    const userid = getState().user._id;
    axios.get('/chat/list').then(res => {
      let data = res.data;
      if (data.code === 0) {
        dispatch({type: MSG_LIST, payload: data, userid: userid})
      }
    })
  }
}

export function sendMsg({from, to, msg}) {
  return dispatch => {
    socket.emit('sendmsg', {from, to, msg})
  }
}

export function recvMsg() {
  return (dispatch, getState) => {
    const userid = getState().user._id;
    socket.on('recvmsg', function (data) {
      dispatch({type: MSG_RECV, payload: data, userid})
    })
  }
}