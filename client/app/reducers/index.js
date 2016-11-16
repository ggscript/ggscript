import { combineReducers } from 'redux'
import userData from './Reducer_UserData'
import getLevelData from './Reducer_GetLevelData'

const ggscript = combineReducers({
  userData,
  getLevelData
})


export default ggscript