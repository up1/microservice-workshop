'use strict'

const express = require('express')
const Redis = require('ioredis')

const redis = new Redis()
const app = express()
const port = process.env.PORT || 3002

const HEALTH_TIMEOUT = 1000

// Health check API
app.get('/healthz', (req, res) => {
  Promise.all([
    promiseTimeout(redis.get('dummy_key'), HEALTH_TIMEOUT)
  ])
    .then(() => res.json({ status: 'ok' }))
    .catch((err) => {
      console.error('Healthcheck error', err)
      res.statusCode = 500
      res.json({ status: 'error' })
    })
})

app.listen(port, () => {
  console.info(`Server is listening on port ${port}!`)
})

function promiseTimeout (originalPromise, timeout) {
  return Promise.race([
    Promise.resolve(originalPromise),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Timed out'))
      }, timeout)
    })
  ])
}