const Article = require('../api/article')
const { validToken } = require('../api/auth')

module.exports = app => {

    const { create, findByBlogs, updateOne, removeOne, findOne, addLike } = Article

    app.route('/article')
        .all(validToken)
        .get(findByBlogs)
        .post(create)

    app.route('/article/:id')
        .all(validToken)
        .get(findOne)
        .post(addLike)
        .put(updateOne)
        .delete(removeOne)
}