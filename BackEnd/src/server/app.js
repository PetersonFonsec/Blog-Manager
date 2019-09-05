require('dotenv').config()

const express = require('express')
const bodyParse = require('body-parser')
const cors = require('cors')
const consign = require('consign')

class AppController{

    constructor(){
        this.express = express()
        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.express.use(bodyParse.json())
        this.express.use(cors())
    }

    routes(){                
        const self = this.express
        consign()
            .then('./server/db.js')
            .then('./api')
            .then('./routes')
            .into(self)
    }

}

module.exports = new AppController().express