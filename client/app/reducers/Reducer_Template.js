export default function(state = {}, action) {
  switch (action.type) {
    case 'LOAD_TEMPLATE_DATA':
    console.log('TEMPL REDUCER');
      return action.data;
      break;
  }
  return state;
}
