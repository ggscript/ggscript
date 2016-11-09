import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import profile from './profile'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  profile
})


export default todoApp