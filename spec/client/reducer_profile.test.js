import reducer from '../../client/app/reducers/profile'

describe('profile reducer', () => {
	it('should return the initial state', () => {
		expect(
			reducer({},{})
		).toEqual({})
	})
	it('should handle INITIALIZE_STORE', () => {
		expect(
			reducer({}, {
				type: 'INITIALIZE_STORE',
				data: {name: 'username', id: 1}
			})
		).toEqual({name: 'username', id: 1})
	})
})