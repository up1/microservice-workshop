'use strict'

const express = require('express')
const httpProxy = require('express-http-proxy')
const request = require('request-promise-native')
const xml = require('xml')
const Eureka = require('eureka-js-client').Eureka;

// Constants
const PORT = process.env.PORT || 3001
const HOST = '0.0.0.0';
const app = express();

// Configuration
const client = new Eureka({
  // application instance information
  instance: {
    app: 'api-gateway',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    statusPageUrl: 'http://localhost:' + PORT,
    vipAddress: 'api-gateway',
    port: {
      $: PORT,
      '@enabled': 'true',
    },
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
    registerWithEureka: true,
    fetchRegistry: true,
    leaseRenewalIntervalInSeconds: 1,
    leaseExpirationDurationInSeconds: 2
  },
  eureka: {
    // Eureka server
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps/',
  },
});

client.logger.level('debug');
client.start(error => {
  console.log(error || 'NodeJS Eureka Started!');

  // Service discovery from Eureka server
  const service1Instance = client.getInstancesByAppId('service1');  
  const service1Url = `http://${service1Instance[0].hostName}:${service1Instance[0].port.$}`;
  const service1Proxy = httpProxy(service1Url)
  console.log(`Service 1: ${service1Url}`)

  // Shared general logic: Authentication
  app.use((req, res, next) => {
    // TODO: authentication logic
    console.log(`Authentication: ${req.path}`)
    next()
  });

  // Aggregate services after authentication
  app.get('/', async (req, res) => {
    const services = await Promise.all([
      request({ uri: service1Url, json: true })])

    const response = { services }

    // Format transformation: XML or JSON
    if (req.get('Content-Type') === 'application/xml') {
      const xmlResponse = xml(response)
      res.set('content-type', 'text/xml')
      res.end(xmlResponse)
    } else {
      res.json(response)
    }
  });

  // Proxy request after authentication
  app.use('/service1', (req, res, next) => {
    service1Proxy(req, res, next)
  });

});

app.listen(PORT, HOST);
console.log(`Running API gateway on http://${HOST}:${PORT}`);