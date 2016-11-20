const updateSandboxCode = (state = {sandboxGameCode: `var game = new Phaser.Game(600, 450, Phaser.CANVAS, 'gamebox', { preload: preload, create: create }); function preload() {} function create() {}`}, action) => {
  switch (action.type) {
    case 'UPDATE_SANDBOX_CODE':
      return {sandboxGameCode: action.code}


    default:
      return state
  }
}

export default updateSandboxCode
