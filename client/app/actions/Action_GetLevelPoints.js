function loadLevelPointsUponResponse(data){
	console.log('loadLevelPointsUponResponse', data)
	return {type: 'LOAD_LEVEL_POINTS', data}
};

function getLevelPoints() {
	return function(dispatch){
		fetch(`api/levelpoints`, {
			method: 'get', 
		})
		.then(response => {
			response.json().then(res => {
				dispatch(loadLevelPointsUponResponse(res))
			})
			.catch(err => {console.log(err)})
		}).catch(err => {
			console.log(err);
		});
		return null;
	};
}

export {getLevelPoints, loadLevelPointsUponResponse}