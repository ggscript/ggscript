import reducer from '../../client/app/reducers/Reducer_UpdateSandboxCode'

describe('updatesandcode reducer', () => {
	it('should return the initial state', () => {
		expect(
			reducer({},{})
		).toEqual({})
	})
	it('should return the state', () => {
		expect(
			reducer({sandboxGameCode: `var game = new Phaser.Game(600, 450, Phaser.CANVAS, 'gamebox', { preload: preload, create: create }); function preload() {} function create() {}`}, {})
		).toEqual({sandboxGameCode: `var game = new Phaser.Game(600, 450, Phaser.CANVAS, 'gamebox', { preload: preload, create: create }); function preload() {} function create() {}`})
	})
})