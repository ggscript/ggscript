const reducerTemplate = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_TEMPLATE_DATA':
    console.log('TEMPL REDUCER');
      return { template: action.data };
  // This is what updates the store's state
    default:
    return state;
    // must be pure fn, cannot change params or cannot do async for outside data
    // what it returns must solely be provided by inputs
  }
}

export default reducerTemplate
