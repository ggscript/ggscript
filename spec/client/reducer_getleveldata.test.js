import reducer from '../../client/app/reducers/Reducer_GetLevelData'

describe('getleveldata', () => {
	it('should return the initial state', () => {
		expect(
			reducer({}, {})
		).toEqual({})
	})
	it('should handle LOAD_LEVEL_DATA', () => {
		expect(
			reducer({}, {
				type: 'LOAD_LEVEL_DATA',
				data: {level: 2, title: 'space cat'}})
		).toEqual({level: 2, title: 'space cat'})
	})
})