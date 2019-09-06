import axios from 'axios'

//constants
const USER_LIST = 'USER_LIST';

//reducer
const defaultState = {
  userList:[]
}

export const chatUserReducer  = (state=defaultState,action)=>{
  switch (action.type) {
    case USER_LIST:
      return {...state,userList: action.payload};
    default:
      return state;
  }
}

//actionCreators

export function getUserList(type) {
  return dispatch => {
    console.log(type);
    axios.get(`/user/list?type=${type}`).then(res=>{
      let data = res.data;
      if(data.code === 0){
        dispatch({type:USER_LIST,payload:data.data})
      }
    })
  }
}