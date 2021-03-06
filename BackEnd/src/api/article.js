const articleDB = require('../model/article')

const blogDb = require('../model/blog')

class Article {
    constructor(){}

    async create(req, res){

        const { title, blog, description, content, photo } = req.body
    
        const err = msg => res.status(401).send({ msg }) 
    
        if(!title)       return err('O titulo é obrigatório')
        if(!blog)        return err('O id do blog é obrigatório')
        if(!description) return err('a Descrição é obrigatória')
        if(!content)     return err('Todo article deve ter conteudo')
        if(!photo)       return err('Todo article deve ter uma foto de capa')

        const author = req.userID

        try {

            const validatinTile = await articleDB.findOne({ title })

            if(validatinTile) return res.status(501).send({ msg: 'artigo com o titulo já criado' })
            
            const result = await articleDB.create({ 
                title,
                blog,
                description,
                content,
                author,
                photo
            })

            if(!result) return res.status(401).send({ msg : 'usuario não encontrado' })

            const articleCreated = await articleDB.findOne({ title })

            return res.status(200).send({ result : articleCreated })

        } catch (error) {
            return res.status(501).send({ msg: error })
        }
    
    }

    async findOne(req, res){
        const _id = req.params.id
    
        if( !_id ) return res.status(401).send({ msg: 'Id é um campo obrigatório'})
    
        try {

            const result = await articleDB.findOne({ _id }).populate('author')
    
            if(!result) return res.status(501).send({ msg: 'Artigo não encontrado' })

            return res.status(200).send({ result })
    
        } catch (error) {
            return res.status(501).send({ msg: error })
        }
    
    }

    async findByBlogs(req, res){

        const _id = req.userID
    
        const err = msg => res.status(401).send({ msg }) 
    
        try {
    
            const getBlogsByAthors = {  authors : { $in: [ _id ] } }
    
            const allBlogs = await blogDb.find(getBlogsByAthors)
    
            if(!allBlogs) return err('Artigo não encontrado')
    
            const blogIds = allBlogs.map( blog => blog._id )
            
            const getArticlesByBlogs = { blog: blogIds }

            const fields = {
                title: 1,
                description: 1,
                photo: 1,
                author: 1,
                createdAt: 1,
                blog: 1
            }

            const allArticles = await articleDB
                .find(getArticlesByBlogs, fields)
                .populate('author', 'name')
    
            if(!allArticles) return err('Artigo não encontrado')
    
            return res.status(200).send({ result: allArticles })
    
        } catch (error) {
            return res.status(501).send({ msg: error })
        }
    }

    async findAll(req, res){
        try {
            const fields = {
                title: 1,
                description: 1,
                photo: 1,
            }

            const result = await articleDB.find({}, fields)
    
            return result
                ? res.status(200).send({ result })
                : res.status(401).send({ msg: 'Artigo não encontrado' })
    
        }catch(error) {
            return res.status(501).send({ msg: error })
        }
    }

    async updateOne(req, res){

        const _id = req.params.id

        if( !_id ) return res.status(401).send({ msg: 'Id é um campo obrigatório'})

        try {

            const { blog, author } = req.body

            if( blog ) 
                return res.status(401).send({ msg: 'Não é permitido alterar o blog'})

            if( author ) 
                return res.status(401).send({ msg: 'Não é permitido alterar o autor'})

            const result = await articleDB.findByIdAndUpdate( _id, { ...req.body } )

            if( !result ) return res.status(401).send({ msg: 'Artigo não encontrado' })
            
            const articleUpdated =  await articleDB.findById( _id )
            
            return res.status(200).send({ result: articleUpdated })

        } catch (error) {
            return res.status(501).send({ msg: error })
        }
    }

    async removeOne(req, res){
        const _id = req.params.id
    
        if( !_id ) return res.status(401).send({ msg: 'Id é um campo obrigatório'})
    
        try {
    
            const result = await articleDB.findOneAndRemove({ _id })
    
            return result
                ? res.status(200).send({ result })
                : res.status(401).send({ msg: 'Artigo não encontrado' })
    
        } catch (error) {
            return res.status(501).send({ msg: error })
        }
    }

    async addLike(req, res){

        const _id = req.params.id
    
        if( !_id ) return res.status(401).send({ msg: 'Id é um campo obrigatório'})
    
        try {
    
            const article = await articleDB.findById(_id)
    
            if(article){
    
                article.likes++
    
                article.save()
             
                return res.status(200).send({ result: article })
    
            }else{
                return res.status(401).send({ msg: 'Artigo não encontrado' })
            }
    
        } catch (error) {
            return res.status(501).send({ msg: error })
        }
    } 
}

module.exports = new Article()