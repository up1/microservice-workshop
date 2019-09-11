var logger = require('winston')
require('winston-logstash-udp');

logger.add(logger.transports.LogstashUDP, {
    port: 12201,
    level: 'debug',
    appName: 'demo',
    host: '127.0.0.1'
});

let interval = 1000 * 2

log = () => {
    let  i = 0;
    logger.debug({ 
        'someMeta': 'someData',
        'array': [ 1, 2, 3 ],
        'counter': i++
    })
    
}

setInterval(log, interval)