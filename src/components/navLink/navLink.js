import React from 'react'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

const Item = TabBar.Item;

class NavLink extends React.Component {
  render() {
    const navList = this.props.data.filter(v => !v.hide);
    const {pathname} = this.props.location;
    return (
      <div>
        <TabBar>
          {
            navList.map(v => (
              <Item
                key={v.path}
                title={v.text}
                icon={{uri: require(`./img/${v.icon}.png`)}}
                selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
                selected={pathname === v.path}
                onPress={() => {
                  this.props.history.push(v.path)
                 }
                }
              />
            ))
          }
        </TabBar>
      </div>
    )
  }
}

export default withRouter(NavLink)