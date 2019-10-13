const blogDb = require("../model/blog")

class BlogController {
    
    constructor(){}

    async create(req, res){
        
        const { name } = req.body
        const creator = req.userID
        const authors = [ req.userID ]
    
        if( !name  ) return res.status(401).send({ msg: "Campo Name é Obrigatorio"})
        
        if( !creator  ) return res.status(401).send({ msg: "Usuário não esta logado"})

        try {
    
            const blogsExist = await blogDb.findOne({ name })
    
            if( blogsExist ) return res.status(401).send({ msg: "Blog já existente"})
    
            const result = await blogDb.create({ name, creator, authors })
    
            return res.status(200).send({ result })
    
        } catch (error) {    
            return res.status(501).send({ msg: error })
        }
    
    }

    async findOne(req, res){
        
        try {

            const { id:_id } = req.params

            if(!_id) return res.status(401).send({ msg: "ID do blog não informado" })

            const result = await blogDb.findOne({ _id })

            return result
                ? res.status(200).send({ result })
                : res.status(404).send({ msg: "Blog não encontrado" })
    
        }catch(error) {
            return res.status(404).send({ msg: error })
        }
    }

    async find(req, res){
       
        try {
       
            const result = await blogDb.find()
    
            return res.status(200).send({ result })
    
        }catch(error) {
            return res.status(501).send({ msg: error })
        }

    }

    async findByIdUser(req, res){
        
        try {
        
            const _id = req.userID
    
            if(!_id) return res.status(401).send({ msg: "Id é obrigatório" })
        
            const result = await blogDb.find({  authors : { $in: [ _id ] } })
    
            return res.status(200).send({ result })
    
        }catch(error) {
            return res.status(501).send({ msg: error })
        }
    }

    async giveAcess(req, res){
       
        const { id: _id } = req.params

        const { authors } = req.body

        const idUserLogged = req.userID

        if( !authors || !authors[0] ) 
            return res.status(401).send({ msg: 'Id do novos authores não forão enviados' }) 

        authors.push(idUserLogged)

        try {
    
            const fieldUpdated = { $set : { authors } }

            const updated = await blogDb.findOneAndUpdate({ _id }, fieldUpdated)
    
            if(!updated) return res.status(404).send({ msg: "Usuário não encontrado" })

            const result = await await blogDb.findById(_id)
                
            res.status(200).send({ result })
    
        }catch(error){
            return res.status(501).send({ msg: error })
        }
    }

    async updateOne(req, res){
      
        const { id } = req.params
    
        try {

            if(req.body.creator) 
                return res.status(401).send({ msg: "Não é permitido auterar o criado do blog" })
    
            const updated = await blogDb.findOneAndUpdate({ _id: id }, { ...req.body } )
    
            if(!updated) return res.status(404).send({ msg: "Blog não encontrado" })

            const result = await blogDb.findById(id)

            return res.status(200).send({ result })
    
        }catch(error){
    
            return res.status(501).send({ msg: error })
        }
    }
    
    async removeOne(req, res){
     
        const _id = req.params.id
    
        try {
      
            const result = await blogDb.findOneAndRemove({ _id })
    
            return result
                ? res.status(200).send({ result })
                : res.status(404).send({ msg: "Blog não encontrado" })
    
        }catch(error){    
            return res.status(501).send({ msg: error })
        }
    }

}

module.exports = new BlogController()