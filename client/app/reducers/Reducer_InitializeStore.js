const initializeStore = (state = {}, action) => {
  switch (action.type) {
    case 'INITIALIZE_STORE':
      console.log(action.data, 'action');
      return action.data

    default:
      return state
  }
}

export default initializeStore
