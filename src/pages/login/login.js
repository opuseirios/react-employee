import React from 'react'
import Logo from '../../components/logo/logo'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import './login.css'
import {connect} from 'react-redux'
import {login as userLogin} from "../../store/user.redux";
import {Redirect} from 'react-router-dom'

class Login extends React.Component{
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      user:'',
      pwd:''
    }
  }
  handleChange(attr,value){
    this.setState({
      [attr]:value
    })
  }
  handleLogin(){
    this.props.login(this.state);
  }
  render(){
    return(
      <div>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
        <Logo/>
        <h2>登录页面</h2>
        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
        <List>
          <InputItem onChange={(v)=>this.handleChange('user',v)}>
            用户名
          </InputItem>
          <InputItem onChange={v=>this.handleChange('pwd',v)} type='password'>
            密码
          </InputItem>
        </List>
        <WhiteSpace/>
        <WingBlank>
          <Button type='primary' onClick={this.handleLogin}>登录</Button>
          <WhiteSpace/>
          <Button type='primary'>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

const mapState = (state)=>({
  msg:state.user.msg,
  redirectTo:state.user.redirectTo
})

const mapDispatch = (dispatch)=>({
  login(state){
    dispatch(userLogin(state))
  }
})

export default connect(mapState,mapDispatch)(Login)