import React from 'react'
import {connect} from 'react-redux'
import {List,Result,WhiteSpace,Button,Modal} from 'antd-mobile'
import {logout as userLogout} from "../../store/user.redux";
import browserCookies from 'browser-cookies'


class User extends React.Component{
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(){
    const alert = Modal.alert;
    alert('注销','确认退出登录么？？？',[
      {text:'取消',onPress:()=>{console.log('cancel')}},
      {text:'确认',onPress:()=>{
          // browserCookies.erase('userid');
          this.props.logout();
          // this.props.history.push('/login')
        }}
    ])
  }
  render(){
    const user = this.props.user;
    const Item = List.Item;
    const Brief = Item.Brief;
    return user.avatar?(
      <div>
        <Result
          img={<img src={require(`../img/${user.avatar}.png`)} style={{width:50}} alt=""/>}
          title={user.user}
          message={user.type==='boss'?user.company:null}
        />
        <List renderHeader={()=>'简介'}>
          <Item multipleLine>
            {user.title}
            {user.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
            {user.money?<Brief>薪资：{user.money}</Brief>:null}
          </Item>
        </List>
        <WhiteSpace/>
        <Button type='primary' onClick={this.handleLogout}>退出登录</Button>
      </div>
    ):null
  }
}

const mapState = (state)=>({
  user:state.user
})

const mapDispatch = (dispatch)=>({
  logout(){
    dispatch(userLogout);
  }
})

export default connect(mapState,mapDispatch)(User);