const Blog = require('../api/blog')
const { validToken } = require('../api/auth')

module.exports = app => {

    const { create, find, updateOne, removeOne, findOne } = Blog

    app.route('/blog')
        .all(validToken)
        .post(create)
        .get(find)

    app.route('/blog/:id')
        .all(validToken)
        .put(updateOne)
        .delete(removeOne)
        .get(findOne)
}