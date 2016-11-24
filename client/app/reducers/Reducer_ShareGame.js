const shareGame = (state = {}, action) => {
  switch (action.type) {
    case 'SHARE_GAME':
      console.log('LINK: ', action.data);
      return action.data

    default:
      return state
  }
}

export default shareGame
