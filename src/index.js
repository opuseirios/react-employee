import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import store from './store'
import './config'
import './index.css';
import 'antd-mobile/dist/antd-mobile.css'


import Login from './pages/login/login'
import Register from './pages/register/register'
import BossInfo from './pages/bossinfo/bossinfo'
import GeniusInfo from './pages/geniusInfo/geniusInfo'
import Chat from './pages/chat/chat'
import AuthRoute from './components/authRoute/authRoute'
import DashBoard from './components/dashBoard/dashBoard'

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute/>
        <Switch>
          <Route path='/bossInfo' component={BossInfo}/>
          <Route path='/geniusInfo' component={GeniusInfo}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/chat/:user' component={Chat}/>
          <Route component={DashBoard}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
