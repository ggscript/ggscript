import { combineReducers } from 'redux'
import initializeStore from './Reducer_InitializeStore'
import getLevelData from './Reducer_GetLevelData'
import getTemplateData from './Reducer_Template'
// import templates from './Reducer_Templates'

const ggscript = combineReducers({
  initializeStore,
  getLevelData,
  getTemplateData
})


export default ggscript
