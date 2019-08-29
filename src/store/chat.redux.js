import axios from 'axios'

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
      return state;
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