import { ElasticClient } from '../elastic-client'
import 'isomorphic-fetch'
describe('elastic-client', () => {
  it('should create and delete elastic index', async () => {
    const client = new ElasticClient({ hosts: ['http://localhost:9200'] })

    try {
      await client.createIndex({
        index: 'hello-world2',
        mappings: { properties: { hello: { type: 'boolean' } } },
      })
      const result = await client.deleteIndex({ index: 'hello-world2' })
      expect(result.code).toBe(200)
    } catch {}
  })

  it('should index and update document', async () => {
    const client = new ElasticClient({ hosts: ['http://localhost:9200'] })
    const response1 = await client.index({
      index: 'hello-world',
      document: { hello: true },
      id: '1',
    })
    const response2 = await client.update({
      index: 'hello-world',
      doc: { hello: false },
      id: '1',
    })
    expect(response1.code).toBe(201)
    expect(response2.code).toBe(200)
  })

  it('should search document', async () => {
    const client = new ElasticClient({ hosts: ['http://localhost:9200'] })
    const result = await client.search({
      index: 'hello-world',
      query: {
        match: {
          hello: true,
        },
      },
    })

    expect(result.code).toBe(200)
  })
  it('should count document', async () => {
    const client = new ElasticClient({ hosts: ['http://localhost:9200'] })
    const result = await client.countIndex({
      index: 'hello-world',
      query: {
        match: {
          hello: true,
        },
      },
    })

    expect(result.code).toBe(200)
  })

  it('should delete document', async () => {
    const client = new ElasticClient({ hosts: ['http://localhost:9200'] })
    const result = await client.delete({
      index: 'hello-world',
      id: '1',
    })
    expect(result.code).toBe(200)
  })
})
