require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const compression = require('compression')
const express     = require('express')
const bodyParse   = require('body-parser')
const consign = require('consign')
const morgan  = require('morgan')
const logger  = require('../config/logger')
const helmet  = require('helmet')
const cors = require('cors')

class AppController {

    constructor(){

        this.express = express()
        this.middlewares()
        this.routes()

    }

    middlewares(){

        this.express.use(bodyParse.json())
        this.express.use(express.static('uploads'))
        this.express.use(express.static('public'))
        this.express.use(morgan("combined", { stream: logger.stream }))
        this.express.use(compression())
        this.express.use(helmet())
        this.express.use(cors())

    }

    routes(){                

        const self = this.express

        consign({ verbose: process.env.NODE_ENV !== 'test' })
            .then('./src/server/db.js')
            .then('./src/routes')
            .into(self)

    }

}

module.exports = new AppController().express