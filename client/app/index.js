import React from 'react'
import { render } from 'react-dom'
import { Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import ggscript from './reducers'
import containerApp from './containers/Container_App'
import SampleApp from './components/SampleApp'
import { Router, Route, hashHistory } from 'react-router'
import Login from './components/Login'
import Logout from './components/Logout'
import Sandbox from './components/Component_Sandbox'
import Home from './components/Home'
import Learn from './containers/Container_Learn'
import Profile from './components/Profile'
import thunk from 'redux-thunk'

let store =  applyMiddleware(thunk)(createStore)(ggscript);


render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={containerApp}>
        <Route path="/home" component={Home}/>
        <Route path="/learn" component={Learn}/>
        <Route path="/sandbox" component={Sandbox}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/login" component={Login}/>
        <Route path="/sampleapp" component={SampleApp}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);