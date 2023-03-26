# Elastic search tiny client

[![Build](https://github.com/samuelgjabel/elastic-tiny-client/actions/workflows/build.yml/badge.svg)](https://github.com/samuelgjabel/elastic-tiny-client/actions/workflows/build.yml) [![Code quality check](https://github.com/samuelgjabel/elastic-tiny-client/actions/workflows/code-check.yml/badge.svg)](https://github.com/samuelgjabel/elastic-tiny-client/actions/workflows/code-check.yml)
[![Build Size](https://img.shields.io/bundlephobia/minzip/elastic-tiny-client?label=Bundle%20size)](https://bundlephobia.com/result?p=elastic-tiny-client)

Zero dependency, fetch based tiny elasticsearch client.

Also it work's in browser, [node.js](http://nodejs.org/) and [bun](https://bun.sh/) 🥳
Probably can be also run in [deno](https://deno.land/), but not tested yet.


Why? Because I needed a elasticsearch client for [bun](https://bun.sh/) but [elasticsearch-js](https://github.com/elastic/elasticsearch-js) still not works 🥺

### Install

```bash 
yarn add elastic-tiny-client // or bun add elastic-tiny-client
```


### Simple usage

```ts
import { ElasticClient } from 'elastic-tiny-client'
const client = new ElasticClient({ hosts: ['http://localhost:9200'] })


const indexResult = await client.index({
  index: 'my-index',
  body: {
    title: 'test',
  },
})

const result = await client.search({
  index: 'my-index',
  body: {
    query: {
      match: {
        title: 'test',
      },
    },
  },
})


const deleteResult = await client.delete({
  index: 'my-index',
  id: indexResult.body._id,
})
```



Basic api are taken from [elasticsearch-rest-api-docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/rest-apis.html).
There are still some parts missing, so PR's are welcome 😎.