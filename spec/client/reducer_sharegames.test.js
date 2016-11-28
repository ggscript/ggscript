import reducer from '../../client/app/reducers/Reducer_ShareGame'

describe('shared game reducer', () => {
	it('should return the initial state', () => {
		expect(
			reducer({}, {})
		).toEqual({})
	})
	it('should handle SHARE_GAME', () => {
		expect(
			reducer({}, {
				type: 'SHARE_GAME',
				data: {game: 'game code', id: 7}
			})
		).toEqual({game: 'game code', id: 7})
	})
})