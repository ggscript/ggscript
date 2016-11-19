const updateSandboxCode = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_SANDBOX_CODE':
      console.log(action, 'action from update sandbox code reducer');
      console.log(state, 'state from update sandbox code reducer');
      return {code: action.code}


    default:
      return state
  }
}

export default updateSandboxCode
