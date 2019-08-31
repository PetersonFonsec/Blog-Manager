const Blog = require('../api/blog')
const { validToken } = require('../api/auth')

module.exports = app => {

    const { create, find, updateOne, removeOne, findOne, giveAcess } = Blog

    app.route('/blog')
        .all(validToken)
        .post(create)
        .get(find)

    app.route('/blog/:id')
        .all(validToken)
        .put(updateOne)
        .post(giveAcess)
        .delete(removeOne)
        .get(findOne)
}