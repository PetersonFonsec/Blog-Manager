const articleDB = require('../model/article')

const UserDB = require('../model/user')

const blogDb = require('../model/blog')

const totalizersBlogAndArticles = async (req, res) => {
    const _id = req.userID 
    
    const err = msg => res.status(401).send({ msg }) 
  
    try {

        const getBlogsByAthors = {  authors : { $in: [ _id ] } }

        const allBlogs = await blogDb.find(getBlogsByAthors)

        if(!allBlogs || allBlogs.length === 0){

            const result = {
                blogs: 0,
                articles: 0
            }

            res.status(200).send({ result })
        } 

        const blogIds = allBlogs.map( blog => blog._id )
        
        const getArticlesByBlogs = { blog: blogIds }

        const allArticles = await articleDB.find(getArticlesByBlogs).count()

        if(!allArticles) return err('Artigo não encontrado')

        const result = {
            blogs: blogIds.length,
            articles: allArticles
        }

        res.status(200).send({ result })

    } catch (error) {
        return res.status(501).send({ msg: error })
    }

}

const statsLikeArticle = async (req, res) => {
    const _id = req.userID 
    
    const err = msg => res.status(401).send({ msg }) 
  
    try {

        const getBlogsByAthors = {  authors : { $in: [ _id ] } }

        const allBlogs = await blogDb.find(getBlogsByAthors)

        if(!allBlogs || allBlogs.length === 0){

            const result = [{
                likes: 0,
                articles: 0
            }]

            return res.status(200).send({ result })
        } 

        const blogIds = allBlogs.map( blog => blog._id )

        const getArticlesByBlogs = { blog: blogIds }

        const fields = { likes: 1, title: 1 }

        const likesAndArticles = await articleDB.find(getArticlesByBlogs, fields)

        if(!likesAndArticles) return err('Artigo não encontrado')

        return res.status(200).send({ likesAndArticles })

    } catch (error) {
        return res.status(501).send({ msg: error })
    }

}

const authorsEachBlog = async (req, res) => {

    const _id = req.userID

    try {

        const getBlogsByAthors = {  authors : { $in: [ _id ] } }

        const fields = { name: 1, authors: 1 }

        const allBlogs = await blogDb.find(getBlogsByAthors, fields)

        const authorsAndBlogs = allBlogs.map( blog => ({ name: blog.name, authors: blog.authors.length }) )

        return res.status(200).send({ authorsAndBlogs })

    } catch (error) {
        return res.status(501).send({ msg: error })
    }

}

const articlesEachAuthor = async (req, res) => {

    const _id = req.userID

    const err = msg => res.status(401).send({ msg }) 

    try {

        const getBlogsByAthors = {  authors : { $in: [ _id ] } }

        const allBlogs = await blogDb.find(getBlogsByAthors)

        if(!allBlogs) return err('Artigo não encontrado')

        const blogIds = allBlogs.map( blog => blog._id )
        
        const getArticlesByBlogs = { blog: blogIds }

        const allArticles = await articleDB.find(getArticlesByBlogs)

        if(!allArticles) return err('Artigo não encontrado')

        const allAuthorsId = allArticles.map( artcile => artcile.author )

        const queryUser = { _id : allAuthorsId }

        const fieldsUser = { name: 1 }

        const namesAuthor = await UserDB.find(queryUser, fieldsUser)

        const articleSummarizedByIdAuthor = {}

        const summarizesQuantityArticles = author =>
            articleSummarizedByIdAuthor[author] 
                ? articleSummarizedByIdAuthor[author]++ 
                : articleSummarizedByIdAuthor[author] = 1

        allAuthorsId.map(summarizesQuantityArticles)

        const changeIdForNameAuthor = author =>
         ({ name: author.name, amountArticles: articleSummarizedByIdAuthor[author._id] })

        const result = namesAuthor.map( changeIdForNameAuthor )

        return res.status(201).send({ result })

    } catch (error) {
        console.log(error)
        return res.status(501).send({ msg: error })
    }
}

module.exports = { totalizersBlogAndArticles, statsLikeArticle, authorsEachBlog, articlesEachAuthor }