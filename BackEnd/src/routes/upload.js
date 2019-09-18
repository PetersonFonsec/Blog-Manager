const multer = require('multer')
const multerConfig = require('../config/multer')
const { updateLogged } = require('../api/user')
const { validToken } = require('../api/auth')

const mulderMiddleWare = multer(multerConfig).single('avatar')

module.exports = app => {

    app.post( '/upload/coverArticle', 
        validToken,
        mulderMiddleWare,
        (req, res) => res.status(200).send({ file: req.file.filename }) 
    )

    app.post( '/upload/avatar',
        validToken,
        mulderMiddleWare,
        (req, res) => {
            req.body.avatar = req.file.filename
            updateLogged(req, res)
        }
    )

}