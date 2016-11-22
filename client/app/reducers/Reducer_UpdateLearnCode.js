const updateLearnCode = (state = {learnCode: `var game = new Phaser.Game(600, 450, Phaser.CANVAS, 'gamebox', { preload: preload, create: create }); function preload() {} function create() {}`}, action) => {
  switch (action.type) {
    case 'UPDATE_SANDBOX_CODE':
      return {learnCode: action.code}


    default:
      return state
  }
}

export default updateLearnCode
