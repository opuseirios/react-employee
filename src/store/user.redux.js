import axios from 'axios'
import {getRedirectTo} from "../util";

//constants
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

//reducer
const defaultState = {
  msg: '',
  data: '',
  redirectTo: '',
  user: ''
}

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      console.log(action.payload)
      return {...state,msg:'',redirectTo:getRedirectTo(action.payload),...action.payload};
    case ERROR_MSG:
      return {...state,msg:action.msg}
    default:
      return defaultState;
  }
}

//actionCreators
function authSuccess(obj) {
  const {pwd,...data} = obj;
  return {type:AUTH_SUCCESS,payload:data}
}

function errorMsg(msg) {
  return {type: ERROR_MSG, msg}
}

export function register({user,pwd,repwd,type}) {
  if(!pwd||!user){
    return errorMsg('请输入用户名或密码')
  }
  if(pwd!==repwd){
    return errorMsg('两次输入的密码不一致')
  }
  return dispatch=>{
    axios.post('/user/register',{
      user,
      pwd,
      repwd,
      type
    }).then(res=>{
      let data = res.data;
      if(data.code === 0){
        dispatch(authSuccess({user,pwd,type}))
      }else {
        dispatch(errorMsg(data.msg))
      }
    }).catch(e=>{
      dispatch(errorMsg(e))
    })
  }
}

export function login({user,pwd}) {
  if(!user||!pwd){
    return errorMsg('请输入用户名或密码')
  }
  return dispatch=>{
    axios.post('/user/login',{
      user,
      pwd
    }).then(res=>{
      let data = res.data;
      if(data.code === 0){
        dispatch(authSuccess(data.data))
      }else {
        dispatch(errorMsg(data.msg))
      }
    }).catch(e=>{
      dispatch(errorMsg(e))
    })
  }
}