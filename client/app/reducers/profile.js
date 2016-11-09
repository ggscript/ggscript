const profile = (state = {}, action) => {
  switch (action.type) {
    case 'loggedin':
      return {
        isloggedin: true,
      }

    default:
      return state
  }
}

export default profile