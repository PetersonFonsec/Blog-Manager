const articleDB = require('../model/article')

const UserDB = require('../model/user')

const blogDb = require('../model/blog')

const Totalizers = async (req, res) =>  {
    try {

        const blogs = await blogDb.find().count()

        const articles = await articleDB.find().count()

        const users = await UserDB.find().count()

        const result = { blogs, articles, users }

        res.status(200).send({ result })

    } catch (error) {        
        return res.status(501).send({ msg: error })
    }
}

module.exports = { Totalizers }