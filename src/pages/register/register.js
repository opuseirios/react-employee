import React from 'react'
import Logo from '../../components/logo/logo'
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio,Toast} from 'antd-mobile'
import {connect} from 'react-redux'
import {register as userRegister} from "../../store/user.redux";
import {Redirect} from 'react-router-dom'

const RadioItem = Radio.RadioItem;

class Register extends React.Component{
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.state={
      user:'',
      pwd:'',
      repwd:'',
      type:'genius'
    }
  }
  handleChange(attr,value){
    this.setState({
      [attr]:value
    })
  }
  handleRegister(){
    this.props.register(this.state);
  }
  render(){
    return(
      <div>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
        <Logo/>
        <h2>注册页面</h2>
        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
        <List>
          <InputItem onChange={v=>this.handleChange('user',v)}>
            用户名
          </InputItem>
          <WhiteSpace/>
          <InputItem type='password' onChange={v=>this.handleChange('pwd',v)}>
            密码
          </InputItem>
          <WhiteSpace/>
          <InputItem type='password' onChange={v=>this.handleChange('repwd',v)}>
            确认密码
          </InputItem>
          <WhiteSpace/>
          <RadioItem checked={this.state.type=='genius'} onChange={()=>this.handleChange('type','genius')}>牛人</RadioItem>
          <WhiteSpace/>
          <RadioItem checked={this.state.type=='boss'} onChange={()=>this.handleChange('type','boss')}>BOSS</RadioItem>
          <WhiteSpace/>
          <Button type='primary' onClick={this.handleRegister}>注册</Button>
        </List>
      </div>
    )
  }
}

const mapState = (state)=>({
  msg:state.user.msg,
  redirectTo:state.user.redirectTo
})

const mapDispatch = (dispatch)=>({
  register(state){
    dispatch(userRegister(state))
  }
})

export default connect(mapState,mapDispatch)(Register)