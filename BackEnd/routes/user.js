const User = require('../api/user')
const { userAdmin, validToken } = require('../api/auth')

module.exports = app => {

    const { create, find, updateOne, removeOne, findOne, createAdmin } = User

    app.route('/user')
        .get( find )
        .post( create )

    app.route('/user/admin')
        .all( validToken )
        .post( createAdmin )

    app.route('/user/:id')
        .all( validToken )
        .put( userAdmin(updateOne) )
        .delete( userAdmin(removeOne) )
        .get( userAdmin(findOne) )

}