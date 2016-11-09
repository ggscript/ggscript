const initializeStore = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_LEVEL_DATA':
      console.log(action, 'action');
      console.log(state, 'state');
      return action

    default:
      return state
  }
}

export default initializeStore