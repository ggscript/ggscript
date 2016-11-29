import reducer from '../../client/app/reducers/Reducer_Template'

describe('reducer template', () => {
	it('should return the initial state', () => {
		expect(
			reducer({},{})
		).toEqual({})
	})
	it('should handle the load template data', () => {
		expect(
			reducer({}, {
				type: 'LOAD_TEMPLATE_DATA', 
				data: {template: 'var example'}})
		).toEqual({template: {template: 'var example'}})
	})
})