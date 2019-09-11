var winston = require('winston');
var LogstashUDP = require('winston-logstash-udp').LogstashUDP;
 
var logger = new(winston.Logger)({
    transports: [
    new(LogstashUDP)({
        port: 12201,
        appName: 'demo',
        host: '127.0.0.1'
    })
    ]
});