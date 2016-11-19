const saveLevelData = (state = {}, action) => {
  switch (action.type) {
    case 'SAVE_LEVEL_DATA':
      console.log(action, 'action from reducer');
      console.log(state, 'state');
      return action

    default:
      return state
  }
}

export default saveLevelData