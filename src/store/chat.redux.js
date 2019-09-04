import axios from 'axios'

import io from 'socket.io-client'
const socket = io('ws://localhost:9000');


//constants
const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';
const MSG_READ = 'MSG_READ';

//reducer
const defaultState = {
  chatList:[],
  unread:0
}

export const chatReducer = (state=defaultState,action)=>{
  switch (action.type) {
    case MSG_LIST:
      return {...state,chatList: action.payload,unread: action.payload.filter(v=>!v.read).length};
    case MSG_RECV:
      return {...state,chatList: [...state.chatList,action.payload],unread:state.unread+1};
    case MSG_READ:
      return state;
    default:
      return state;
  }
}

//actionCreators
export function getChatList() {
  return dispatch => {
    axios.get('/chat/list').then(res=>{
      let data = res.data;
      if(data.code === 0){
        dispatch({type:MSG_LIST,payload: data.data})
      }
    })
  }
}

export function sendMsg({from,to,msg}) {
  return dispatch=>{
    socket.emit('sendmsg',{from,to,msg})
  }
}
export function recvMsg() {
  return dispatch=>{
    socket.on('recvmsg',function (data) {
      dispatch({type:MSG_RECV,payload: data})
    })
  }
}