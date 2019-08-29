const bodyParse = require('body-parser')
const cors = require('cors')

module.exports = server => {
    server.use(bodyParse.json())
    server.use(cors())
}