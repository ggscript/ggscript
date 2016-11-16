const userData = (state = {}, action) => {
  switch (action.type) {
    case 'INITIALIZE_PROFILE':
      console.log(action.data, 'action');
      return action.data

    case 'INITIALIZE_DISPLAYNAME':
      console.log(action.data, 'displayname action');
      return action.data

    default:
      return state
  }
}

export default userData
