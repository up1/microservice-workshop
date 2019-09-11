'use strict'

const express = require('express')
const opentracing = require('opentracing')
const jaeger = require('jaeger-client')
const request = require('request-promise-native')

// Using UDP
const UDPSender = require('jaeger-client/dist/src/reporters/udp_sender').default

const app = express()
const port = process.env.PORT || 3003

// Tracer
const udpSender = new UDPSender()
const reporter = new jaeger.RemoteReporter(udpSender)
const sampler = new jaeger.RateLimitingSampler(1)
const tracer = new jaeger.Tracer('service 2', reporter, sampler)

app.get('/site/:site', (req, res) => {
  const spanContext = jaeger.SpanContext.fromString(req.headers['trace-span-context'])
  const span = tracer.startSpan('http_server', {
    childOf: spanContext
  })
  span.setTag(opentracing.Tags.HTTP_URL, `${req.protocol}://${req.hostname}${req.originalUrl}`)
  span.setTag(opentracing.Tags.HTTP_METHOD, req.method)
  span.setTag('request_path', req.route.path)
  span.setTag('request_id', req.headers['x-request-id'])

  const requestOptions = {
    headers: { 'trace-span-context': span.context().toString() },
    json: true
  }

  Promise.all([
    request(Object.assign({ uri: 'http://localhost:3004/site/' + req.params.site }, requestOptions))
  ])
    .then((sites) => {
      span.setTag(opentracing.Tags.HTTP_STATUS_CODE, 200)
      res.json({ sites })
    })
    .catch((err) => {
      console.error(err)

      span.setTag(opentracing.Tags.HTTP_STATUS_CODE, 500)
      span.setTag(opentracing.Tags.ERROR, true)

      res.statusCode = 500
      res.json({ status: 'Error in service 2' })
    })
    .then(() => span.finish())
})

app.listen(port, () => {
  console.log(`Service 2 listening on port ${port}!`)
})