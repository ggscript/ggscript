import { combineReducers } from 'redux'
import userData from './Reducer_UserData'
import getLevelData from './Reducer_GetLevelData'
import getTemplateData from './Reducer_Template'
import updateSandboxCode from './Reducer_UpdateSandboxCode'
import updateLearnCode from './Reducer_UpdateLearnCode'
// import templates from './Reducer_Templates'

const ggscript = combineReducers({
  userData,
  getLevelData,
  getTemplateData,
  updateSandboxCode,
  updateLearnCode
})


export default ggscript
