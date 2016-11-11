const initializeStore = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_LEVEL_DATA':
      console.log(action, 'action from reducer');
      console.log(state, 'state');
      return action

    case 'UPDATE_STORE':
      console.log(action, 'action');
      console.log(state, 'state');
      return action

    default:
      return state
  }
}

export default initializeStore
