import React from 'react'
import { render } from 'react-dom'
import { Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import ggscript from './reducers'
import App from './containers/Container_App'
import { Router, Route, hashHistory } from 'react-router'
import Login from './components/Login'
import Logout from './components/Logout'
import Home from './components/Home'
import About from './components/Component_About'
import Sandbox from './containers/Container_Sandbox'
import Learn from './containers/Container_Learn'
import Profile from './containers/Container_Profile'
import thunk from 'redux-thunk'

let store =  applyMiddleware(thunk)(createStore)(ggscript);

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route component={App}>
        <Route path="/" component={Home}/>
        <Route path="/learn" component={Learn}/>
        <Route path="/sandbox" component={Sandbox}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/login" component={Login}/>
        <Route path="/about" component={About}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
