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

            const result = await articleDB.create({ 
                title,
                blog,
                description,
                content,
                author,
                photo
            })

            if(result) return res.status(200).send({ result })

        } catch (error) {
            return res.status(501).send({ msg: error })
        }
    
    }

    async findOne(req, res){
        const _id = req.params.id
    
        if( !_id ) return res.status(401).send({ msg: 'Id é um campo obrigatório'})
    
        try {
    
            const result = await articleDB.findOne({ _id })
    
            return result
                ? res.status(200).send({ result })
                : res.status(401).send({ msg: 'Artigo não encontrado' })
    
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
    
            const allArticles = await articleDB.find(getArticlesByBlogs)
    
            if(!allArticles) return err('Artigo não encontrado')
    
            return res.status(200).send({ result: allArticles })
    
        } catch (error) {
            return res.status(501).send({ msg: error })
        }
    }

    async findAll(req, res){
        try {
            const result = await articleDB.find()
    
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
    
            const result = await articleDB.findByIdAndUpdate( _id, { ...req.params } )
    
            return result
                ? res.status(200).send({ result })
                : res.status(401).send({ msg: 'Artigo não encontrado' })
    
        } catch (error) {
            return res.status(501).send({ msg: error })
        }
    }

    async removeOne(req, res){
        const _id = req.params.id
    
        if( !_id ) return res.status(401).send({ msg: 'Id é um campo obrigatório'})
    
        try {
    
            const result = await articleDB.deleteOne({ _id })
    
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
             
                return res.status(200).send({ result: 'ok' })
    
            }else{
                return res.status(401).send({ msg: 'Artigo não encontrado' })
            }
    
        } catch (error) {
            return res.status(501).send({ msg: error })
        }
    } 
}

module.exports = new Article()