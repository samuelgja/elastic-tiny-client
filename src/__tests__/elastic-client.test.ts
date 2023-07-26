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

  it('should index document', async () => {
    const client = new ElasticClient({ hosts: ['http://localhost:9200'] })
    const response = await client.index({
      index: 'hello-world',
      document: { hello: true },
      id: '1',
    })

    expect(response.code).toBe(201)
  })

  it('should index document', async () => {
    const client = new ElasticClient({
      hosts: ['http://localhost:9200'],
    })

    const count = 100

    const promises: Array<Promise<{ code: number }>> = []
    for (let index = 0; index < count; index++) {
      promises.push(
        client.update({
          retry_on_conflict: 1000,
          index: 'hello-world',
          doc: {
            hello: true,
            user: {
              hello: true,
              dogs: [
                {
                  name: Math.random() * 1000,
                },
              ],
            },
          },
          id: '123',
          refresh: true,
        })
      )
    }
    const result = await Promise.all(promises)

    for (const response of result) {
      expect(response.code).toBe(200)
    }
  })

  it('should update document', async () => {
    const client = new ElasticClient({ hosts: ['http://localhost:9200'] })

    const response = await client.update({
      index: 'hello-world',
      doc: { hello: false },
      id: '1',
    })

    expect(response.code).toBe(200)
  })

  it('should update by query document', async () => {
    const client = new ElasticClient({ hosts: ['http://localhost:9200'] })

    const response = await client.updateByQuery({
      index: 'hello-world',
      query: {
        bool: {
          must: {
            match: {
              hello: false,
            },
          },
        },
      },
    })

    expect(response.code).toBe(200)
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

  it('should delete document', async () => {
    const client = new ElasticClient({ hosts: ['http://localhost:9200'] })

    await client.index({
      index: 'hello-world2',
      document: { hello: true },
      id: '21',
    })

    await client.refreshIndex({ index: 'hello-world2' })
    await client.deleteByQuery({
      index: 'hello-world2',
      query: {
        match: {
          hello: true,
        },
      },
    })
    await client.refreshIndex({ index: 'hello-world2' })
    const search = await client.search({
      index: 'hello-world2',
      query: {
        match: {
          hello: true,
        },
      },
    })

    expect(search.data.hits.hits.length).toBe(0)
  })

  it('should bulk index', async () => {
    const client = new ElasticClient({ hosts: ['http://localhost:9200'] })
    const result = await client.bulk({
      index: 'hello-world',
      body: [
        { index: { _index: 'test', _id: '1' } },
        { field1: 'value1' },
        { delete: { _index: 'test', _id: '2' } },
        { create: { _index: 'test', _id: '3' } },
        { field1: 'value3' },
        { update: { _id: '1', _index: 'test' } },
        { doc: { field2: 'value2' } },
      ],
    })

    expect(result.code).toBe(200)
  })
  it('should bulk index custom', async () => {
    const bulkOptions = {
      body: [
        {
          update: {
            _index: 'hash_tags',
            _id: '123123a',
          },
        },
        {
          doc: {
            name: 'h1',
            use_count: 1000,
            date_create: new Date(),
            date_update: new Date(),
          },
          doc_as_upsert: true,
        },
      ],
      refresh: true,
    }

    const client = new ElasticClient({ hosts: ['http://localhost:9200'] })
    const result = await client.bulk(bulkOptions)

    expect(result.code).toBe(200)
  })
})
