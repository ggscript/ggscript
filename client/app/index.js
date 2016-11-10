import React from 'react'
import { render } from 'react-dom'
import { Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import todoApp from './reducers'
import App from './containers/ContainerApp'
import SampleApp from './components/SampleApp'
import { Router, Route, hashHistory } from 'react-router'
import Login from './components/Login'
import Logout from './components/Logout'
import Sandbox from './components/Learn'
import Home from './components/Home'
import Profile from './containers/Container_Profile'
import thunk from 'redux-thunk'

let store =  applyMiddleware(thunk)(createStore)(todoApp);


render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="/home" component={Home}/>
        <Route path="/learn" component={Sandbox}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/login" component={Login}/>
        <Route path="/sampleapp" component={SampleApp}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);