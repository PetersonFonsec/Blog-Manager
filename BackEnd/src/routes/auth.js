const auth = require('../api/auth')

module.exports = app => {

    app.post('/auth', auth.Login )

    app.route('/validtoken')
        .all(auth.validToken)
        .get((req, res) => 
            res.status(200).send({ msg: 'Token valido'}) 
        )
}