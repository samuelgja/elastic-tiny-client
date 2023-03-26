import { queryParametersGenerator } from '../query-parameters-generator'

describe('query-parameters-generator', () => {
  it('should create query paramaters', () => {
    const params = { hello: 'world', foo: 'bar' }
    const queryParams = queryParametersGenerator(
      {
        hello: 'world',
        foo: 'bar',
      },
      params
    )
    expect(queryParams).toBe('hello=world&foo=bar')
  })
})
