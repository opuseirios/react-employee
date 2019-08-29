import axios from 'axios'

//constants
const USER_LIST = 'USER_LIST';
const ERROR_MSG = 'ERROR_MSG'


//reducer
const defaultState = {
  userList:[]
}

export const chatUserReducer  = (state=defaultState,action)=>{
  console.log(state);
  switch (action.type) {
    case USER_LIST:
      return {...state,userList: action.payload};
    default:
      return state;
  }
}

//actionCreators
function errorMsg(msg) {
  return {type:ERROR_MSG,msg}
}


export function getUserList(type) {
  return dispatch => {
    axios.get(`/user/list?type=${type}`).then(res=>{
      let data = res.data;
      if(data.code === 0){
        dispatch({type:USER_LIST,payload:data.data})
      }else {
        dispatch(errorMsg(data.msg))
      }
    })
  }
}