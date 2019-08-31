const Article = require('../api/article')
const { validToken } = require('../api/auth')

module.exports = app => {

    const { create, find, updateOne, removeOne, findOne } = Article

    app.route('/article')
        .all(validToken)
        .post(create)
        .get(find)

    app.route('/article/:id')
        .all(validToken)
        .put(updateOne)
        .delete(removeOne)
        .get(findOne)
}