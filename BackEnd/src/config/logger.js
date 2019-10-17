const winston = require('winston')

const logger = winston.createLogger({
    transports: [ 
        new winston.transports.Console({ level: 'info' })
    ]
})

logger.stream = {
    write: info => logger.info( info )
}

module.exports = logger