const getLevelData = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_LEVEL_DATA':
      console.log(action, 'action from reducer');
      console.log(state, 'state');
      return action

    case 'UPDATE_STORE':
      console.log(action, 'action');
      console.log(state, 'state');
      return action

    case 'LOAD_LEVEL_POINTS':
      return action.data  

    default:
      return state
  }
}

export default getLevelData
