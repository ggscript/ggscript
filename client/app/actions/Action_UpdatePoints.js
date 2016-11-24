function updatePoints(currlevel,difflevel){
	return function(dispatch){
		fetch('/api/updatepoints',{
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				currlevel: currlevel,
				difflevel: difflevel,
			}),
			credentials: "same-origin"
		}).catch(err => {
			console.log(err);
		});
		return null;
	}
}

export default updatePoints