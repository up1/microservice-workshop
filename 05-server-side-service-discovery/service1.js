'use strict';

const express = require('express');
const Eureka = require('eureka-js-client').Eureka;

// Constants
const PORT = process.env.PORT || 3002
const HOST = '0.0.0.0';
const app = express();

// Configuration
const client = new Eureka({
  // application instance information
  instance: {
    app: 'service1',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    statusPageUrl: 'http://localhost:' + PORT,
    vipAddress: 'service1',
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

  // App
  app.get('/', (req, res) => {
    res.json({
      name: 'service 1 with ' + PORT
    })
  });

});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);