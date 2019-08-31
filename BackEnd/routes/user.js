const User = require('../api/user')
const { userAdmin, validToken } = require('../api/auth')

module.exports = app => {

    const { create, find, updateOne, removeOne, findOne } = User

    app.route('/user')
        .all( validToken )
        .get( userAdmin(find) )
        .post( userAdmin(create) )

    app.route('/user/:id')
        .all( validToken )
        .put( userAdmin(updateOne) )
        .delete( userAdmin(removeOne) )
        .get( userAdmin(findOne) )

}