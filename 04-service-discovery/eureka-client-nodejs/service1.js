'use strict';

const express = require('express');
const request = require('request-promise-native')
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
  },
  eureka: {
    // Eureka server
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps/',
  },
});

var nodeInstance = '';

client.logger.level('debug');
client.start(error => {
  console.log(error || 'NodeJS Eureka Started!');

  nodeInstance = client.getInstancesByAppId('service2');
  
  // App
  app.get('/', (req, res) => {
    const nodeUrl = `http://${nodeInstance[0].hostName}:${nodeInstance[0].port.$}`;
    console.log(nodeUrl);
    request({
      method: 'GET',
      uri: nodeUrl,
      json: true
    })
      .then((body) => res.json(body))
      .catch((err) => next(err))
  });

});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);