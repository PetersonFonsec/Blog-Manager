const Blog = require('../api/blog')

module.exports = app => {
    app.route('/blog')
        .post( Blog.create )
        .get( Blog.find )

    app.route('/blog/:id')
        .put( Blog.updateOne )
        .delete( Blog.removeOne )
        .get( Blog.findOne )
}