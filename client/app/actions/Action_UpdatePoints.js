function updatePoints(currlevel,userid,difflevel,points){
	return function(dispatch){
		fetch('/api/updatepoints',{
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				currlevel: currlevel,
				userid: userid,
				difflevel: difflevel,
				points: points
			}),
			credentials: "include"
		}).catch(err => {
			console.log(err);
		});
		return null;
	}
}

export default updatePoints