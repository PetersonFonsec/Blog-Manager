const Article = require('../api/article')

module.exports = app => {
    app.route('/article')
        .post( Article.create )
        .get( Article.find )

    app.route('/article/:id')
        .put( Article.updateOne )
        .delete( Article.removeOne )
        .get( Article.findOne )
}