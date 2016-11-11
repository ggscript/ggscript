import getLevelData from './Action_GetLevelData'

let nextTodoId = 0

const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}


const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}


const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}

//this action creator is called from redux-thunk function (intializeStore)
function initializeStoreUponResponse(data) {
  return { type: 'INITIALIZE_STORE', data };
}
//this is a thunk function that called initializeStoreUponResponse when a response is recieved
function initializeStore(text) {
  return function(dispatch) {
    fetch('/api/userdata', {
      method: 'get'
    }).then(response => {
      //parse the response and then called the action creator via promise
        response.json().then(res => dispatch(initializeStoreUponResponse(res))).catch(err => {console.log(err)})

    }).catch(err => {
        console.log(err);
    });
  // what you return here gets returned by the dispatch function that used
  // this action creator
  return null;
  }
}

export {
  addTodo,
  setVisibilityFilter,
  toggleTodo,
  initializeStore,
  getLevelData
}
