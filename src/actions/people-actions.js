import * as types from './action-types';

export const addPerson = (person) => {
  return fetch('api/test', {
    method: 'GET'
  }).then(function(response) {
    response.text().then(function(promise) {
      console.log(promise);
    })
  });
}
