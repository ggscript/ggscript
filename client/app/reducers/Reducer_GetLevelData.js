const getLevelData = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_LEVEL_DATA':
      return action.data
      
    default:
      return state
  }
}

export default getLevelData
