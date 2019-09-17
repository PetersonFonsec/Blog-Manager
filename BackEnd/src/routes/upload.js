const multer = require('multer')
const multerConfig = require('../config/multer')

const { validToken } = require('../api/auth')

const mulderMiddleWare = multer(multerConfig).single('avatar')

module.exports = app => {

    app.post( '/upload/coverArticle', 
        validToken,
        mulderMiddleWare,
        (req, res) => res.status(200).send({ file: req.file.path }) 
    )

    app.post( '/upload/avatar',
         validToken,
        mulderMiddleWare,
        (req, res) => res.status(200).send({ file: req.file.path }) 
    )

}