const updateLearnCode = (state = {learnCode: `var game = new Phaser.Game(600, 450, Phaser.CANVAS, 'gamebox', { preload: preload, create: create }); function preload() {} function create() {}`, startLevel: false}, action) => {
  switch (action.type) {
    case 'UPDATE_LEARN_CODE':
      return {
        learnCode: action.code,
        startLevel: action.startLevel
      }


    default:
      return state
  }
}

export default updateLearnCode
