import { combineReducers } from 'redux'
import userData from './Reducer_UserData'
import getLevelData from './Reducer_GetLevelData'
import getTemplateData from './Reducer_Template'
// import templates from './Reducer_Templates'

const ggscript = combineReducers({
  userData,
  getLevelData,
  getTemplateData
})


export default ggscript
