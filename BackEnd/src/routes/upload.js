const multer = require('multer')
const multerConfig = require('../config/multer')

const { validToken } = require('../api/auth')

module.exports = app => {
    app.post(
        '/upload/coverArticle',
        validToken,
        multer(multerConfig).single('avatar'),
        (req, res) => res.status(200).send({ msg: 'ok' }) 
    )
}