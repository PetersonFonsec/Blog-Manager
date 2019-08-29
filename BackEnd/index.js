require('dotenv').config()

const express = require('express')
const consign = require('consign')
const server = express()
const port = process.env.PORT

consign()
    .then('./server')
    .then('./api')
    .then('./routes')
    .into(server)

server.listen(port, () => console.log(`Server Running on port ${port}`) )