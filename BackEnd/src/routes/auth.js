const auth = require('../api/auth')

module.exports = app => {
    app.post('/auth', auth.Login )

    app.all(auth.validToken)
        .get('/validtoken', (req, res) => 
            res.status(200).send({ msg: 'Token valido'}) 
        )
}