import React from 'react'
import {Card, WhiteSpace, WingBlank} from "antd-mobile";


const Header = Card.Header;
const Body = Card.Body;

class UserCard extends React.Component {

  render() {
    return (
      <WingBlank>
        <WhiteSpace/>
        <div>
          {
            this.props.data.map(v => (
              v.avatar ? <Card key={v._id}>
                <Header title={v.user}
                        thumb={require(`../img/${v.avatar}.png`)}
                        extra={<span>{v.title}</span>}
                />
                <Body>
                {v.type === 'boss' ? <div>公司：{v.company}</div> : null}
                {v.desc.split('\n').map(d => (
                  <div key={d}>{d}</div>
                ))}
                {v.type === 'boss' ? <div>薪资:{v.money}</div> : null}
                </Body>
              </Card> : null
            ))
          }
        </div>
      </WingBlank>
    )
  }
}

export default UserCard