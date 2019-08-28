import React from 'react'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import AvatarSelector from '../../components/avatarSelector/avatarSelector'
import {update as userUpdate} from "../../store/user.redux";
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class Bossinfo extends React.Component{
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = {
      title:'',
      desc:'',
      avatar:'',
      company:'',
      money:''
    }
  }

  handleChange(attr,value){
    this.setState({
      [attr]:value
    })
  }
  handleUpdate(){
    this.props.update(this.state);
  }
  render(){
    return(
      <div>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
        <NavBar mode='dark'>BOSS完善信息页</NavBar>
        <AvatarSelector selectAvatar={(imgname)=>{
          this.setState({
            avatar:imgname
          })
        }} />
        <InputItem onChange={v=>this.handleChange('title',v)}>招聘职位</InputItem>
        <InputItem onChange={v=>this.handleChange('company',v)}>公司名称</InputItem>
        <InputItem onChange={v=>this.handleChange('money',v)}>职位薪资</InputItem>
        <TextareaItem
          onChange={v=>this.handleChange('desc',v)}
          rows={3}
          autoHeight
          title='职位要求'
        />
        <Button type='primary' onClick={this.handleUpdate}>保存</Button>
      </div>
    )
  }
}

const mapState = (state)=>({
  redirectTo:state.user.redirectTo
})

const mapDispatch = (dispatch)=>({
  update(state){
    dispatch(userUpdate(state))
  }
})

export default connect(mapState,mapDispatch)(Bossinfo);