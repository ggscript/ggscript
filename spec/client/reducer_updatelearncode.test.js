import reducer from '../../client/app/reducers/Reducer_UpdateLearnCode'

describe('updatelearncode reducer', () => {
	it('should return the initial state', () => {
		expect(
			reducer({}, {})
		).toEqual({})
	})
	it('should return state', () => {
		expect(
			reducer({learnCode: `var game`, startLevel: false}, {})
		).toEqual({learnCode: `var game`, startLevel: false})
	})
})