import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import initializeStore from './initializeStore'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  initializeStore
})


export default todoApp