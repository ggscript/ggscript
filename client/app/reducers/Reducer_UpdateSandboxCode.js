const updateSandboxCode = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_SANDBOX_CODE':
      return {sandboxGameCode: action.code}


    default:
      return state
  }
}

export default updateSandboxCode
