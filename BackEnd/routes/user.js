const User = require('../api/user')

module.exports = app => {
    app.route('/user')
        .post( User.create )
        .get( User.find )

    app.route('/user/:id')
        .put( User.updateOne )
        .delete( User.removeOne )
        .get( User.findOne )
}