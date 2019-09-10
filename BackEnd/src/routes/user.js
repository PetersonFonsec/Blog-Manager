const User = require('../api/user')

const { userAdmin, validToken } = require('../api/auth')

const auth = require('../api/auth')

module.exports = app => {
    const { validPasswordUserLogged } = auth

    const { create, find, updateOne, removeOne, changePassword } = User

    const { findOne, createAdmin, findUserLogged, updateLogged } = User

    app.route('/user')
        .get( find )
        .post( create )

    app.route('/userLogged')
        .all( validToken )
        .get( findUserLogged )
        .put( updateLogged )
        .post( validPasswordUserLogged )

    app.route('/userlogged/changepassword')
        .all( validToken )
        .put( changePassword )

    app.route('/user/admin')
        .all( validToken )
        .post( createAdmin )

    app.route('/user/:id')
        .all( validToken )
        .put( userAdmin(updateOne) )
        .delete( userAdmin(removeOne) )
        .get( userAdmin(findOne) )
}