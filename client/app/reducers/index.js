import { combineReducers } from 'redux'
import initializeStore from './Reducer_InitializeStore'
import getLevelData from './Reducer_GetLevelData'

const ggscript = combineReducers({
  initializeStore,
  getLevelData
})


export default ggscript