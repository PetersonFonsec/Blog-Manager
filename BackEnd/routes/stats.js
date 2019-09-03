const stats = require('../api/stats')

const statsAdmin = require('../api/statsAdmin')

const { validToken, userAdmin } = require('../api/auth')

module.exports = app => {

    const { totalizersBlogAndArticles, statsLikeArticle, authorsEachBlog } = stats

    const { Totalizers } = statsAdmin

    app.route('/totalizers')
        .all(validToken)
        .get( totalizersBlogAndArticles )
    
    app.route('/likesAndArticles')
        .all(validToken)
        .get( statsLikeArticle )

    app.route('/authorsEachBlog')
        .all(validToken)
        .get(authorsEachBlog)

    app.route('/articlesEachAuthor')
            .all(validToken)
            .get(stats.articlesEachAuthor)

    app.route('/totalizers/admin')
        .all(validToken)
        .get( userAdmin(Totalizers) )

}