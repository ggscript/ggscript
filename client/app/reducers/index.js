import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import initializeStore from './Reducer_InitializeStore'
import getLevelData from './Reducer_GetLevelData'

const ggscript = combineReducers({
  todos,
  visibilityFilter,
  initializeStore,
  getLevelData
})


export default ggscript