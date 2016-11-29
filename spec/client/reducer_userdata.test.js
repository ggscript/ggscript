import reducer from '../../client/app/reducers/Reducer_UserData'

describe('userdata reducer', () => {
	it('should return the initial state', () => {
		expect(
			reducer({}, {})
		).toEqual({})
	})
	it('should handle INITIALIZE_PROFILE', () => {
		expect(
			reducer({}, {
				type: 'INITIALIZE_PROFILE', 
				data: {name: 'Michelle', title: 'noob', points: 0}})
		).toEqual({name: 'Michelle', title: 'noob', points: 0})
	})
	it('should handle INITIALIZE_DISPLAYNAME', () => {
		expect(
			reducer({}, {
				type: 'INITIALIZE_DISPLAYNAME',
				data: {name: 'Nikki', title: 'noob', points: 10}
			})
		).toEqual({name: 'Nikki', title: 'noob', points: 10})
	})
})