import { combineReducers } from 'redux'
import userData from './Reducer_UserData'
import getLevelData from './Reducer_GetLevelData'
import getTemplateData from './Reducer_Template'
import updateSandboxCode from './Reducer_UpdateSandboxCode'
import shareGame from './Reducer_ShareGame'
import updateLearnCode from './Reducer_UpdateLearnCode'


const ggscript = combineReducers({
  userData,
  getLevelData,
  getTemplateData,
  updateSandboxCode,
  shareGame,
  updateLearnCode
});


export default ggscript
