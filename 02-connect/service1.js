'use strict'

const express = require('express')
const request = require('request-promise-native')

const app = express()
const port = process.env.PORT || 3002

app.get('*', (req, res) => {
  request({
    method: 'GET',
    uri: 'http://localhost:3003',
    json: true
  })
    .then((body) => res.json(body))
    .catch((err) => next(err))
})

app.listen(port, () => {
  console.info(`Service 1 is listening on port ${port}!`)
})