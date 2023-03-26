import { createWsServer } from './connection/create-ws-server'

const server = await createWsServer({ host: 'localhost', port: 8080 })
