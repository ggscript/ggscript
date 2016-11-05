import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import {createStore} from 'redux'
import todoApp from './reducers'
import App from './components/App'
import { Router, Route, hashHistory } from 'react-router'

let store = createStore(todoApp);


render(
  <Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);