const auth = require('../api/auth')

module.exports = app => {
    app.post('/auth', auth.Login )

    app.get('/validToken', auth.validToken )
}