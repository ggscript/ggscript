let nextTodoId = 0

export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}


export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}


export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}


// renamed optimistic action creator - this won't be called directly 
// by the React components anymore, but from our async thunk function
export function initializeStoreUponResponse(data) {
  return { type: 'INITIALIZE_STORE', data };
}

// the async action creator uses the name of the old action creator, so 
// it will get called by the existing code when a new todo item should 
//  be added
export function initializeStore(text) {
  // we return a thunk function, not an action object!
  // the thunk function needs to dispatch some actions to change the 
  // Store status, so it receives the "dispatch" function as its first parameter
  return function(dispatch) {
    // here starts the code that actually gets executed when the addTodo action 
    // creator is dispatched

    // first of all, let's do the optimistic UI update - we need to 
    // dispatch the old synchronous action object, using the renamed 
    // action creator
    

    // now that the Store has been notified of the new todo item, we 
    // should also notify our server - we'll use here ES6 fetch function 
    // to post the data
    fetch('http://localhost:3000/api/dummydata/users', {
      method: 'get'
    }).then(response => {
        response.json().then(res => dispatch(initializeStoreUponResponse(res))).catch(err => {console.log(err)})
    }).catch(err => {
        console.log(err);
    });
  // what you return here gets returned by the dispatch function that used   
  // this action creator
  return null; 
  }
}