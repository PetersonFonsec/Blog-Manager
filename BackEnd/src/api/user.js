const UserDB = require('../model/user')
const bcrypt = require('bcrypt-nodejs')
const { createToken } = require('../api/auth')

class UserController {

    constructor(){}
    
    async validPassword(password, id){
        const result = await UserDB.findById(id).select("+password")
    
        if(!result) return false

        const isMach = bcrypt.compareSync(password, result.password)

        return isMach
    }

    async create(req, res){
        const { name, password, email } = req.body
    
        if( !name || !password || !email )
            return res.status(401).send({ msg: 'Campo Name, Password ou Email estão inválidos'})
    
        try {
    
            const emailExist = await UserDB.findOne({ email })
    
            if(emailExist) return res.status(401).send({ msg: 'Email já existente'})
    
            const passwordEncripited = bcrypt.hashSync( req.body.password , bcrypt.genSaltSync(10)) 
    
            const result = await UserDB.create({ 
                    name, 
                    email,
                    password: passwordEncripited,
                    admin: false
                })
    
            const { _id, admin } = result
    
            const token = createToken({ _id, admin })
    
            return res.status(200).send({ result, token })
    
        } catch (error) {
    
            return res.status(501).send({ msg: error })
        }
    
    }

    async createAdmin(req, res){
        const { name, password, email } = req.body
        
        if( !name || !password || !email )
            return res.status(401).send({ msg: 'Campo Name, Password ou Email estão inválidos'})
    
        try {

            const emailExist = await UserDB.findOne({ email })

            if(emailExist) return res.status(401).send({ msg: 'Email já existente'})

            const passwordEncripited = bcrypt.hashSync( req.body.password , bcrypt.genSaltSync(10)) 

            const result = await UserDB.create({ 
                name, 
                email,
                password: passwordEncripited,
                admin: true
            })

            const { _id, admin } = result

            const token = createToken({ _id, admin })

            delete result.password

            return res.status(200).send({ result, token })

        } catch (error) {
    
            return res.status(501).send({ msg: error })
        }
    
    }

    async findOne(req, res){
        try {
            const { id } = req.params
    
            const result = await UserDB.findById(id)
    
            return result
                ? res.status(200).send({ result })
                : res.status(404).send({ msg: 'Usuário não encontrado' })
    
        }catch(error) {
            return res.status(501).send({ msg: error })
        }
    }

    async findUserLogged(req, res){
        try {
            const fields = { name: 1, email: 1, avatar: 1 }
            
            const result = await UserDB.findById(req.userID, fields)
            
            return result
                ? res.status(200).send({ result })
                : res.status(404).send({ msg: 'Usuário não encontrado' })
    
        }catch(error) {
            return res.status(501).send({ msg: error })
        }
    }

    async updateLogged(req, res){
        try {
            const result = await UserDB.findByIdAndUpdate(req.userID, { ...req.body })
            
            return result
                ? res.status(200).send({ result })
                : res.status(404).send({ msg: 'Usuário não encontrado' })
    
        }catch(error) {
            return res.status(501).send({ msg: error })
        }
    }
    
    async find(req, res){
        try {

            const fields = { name: 1, email: 1}

            const result = await UserDB.find({}, fields)

            return res.status(200).send({ result })
    
        }catch(error) {
            return res.status(501).send({ msg: error })
        }
    }

    async updateOne(req, res){
        const { id } = req.params

        if(req.body.admin) return res.status(501).send({ msg: 'Não é possivel alterar o campo admin' })

        if( req.body.password ) return res.status(401).send({ msg: 'Campo password não pode ser alterado'})

        try {
            const result = await UserDB.findByIdAndUpdate( id, { ...req.body } )

            return result 
                ? res.status(200).send({ result })
                : res.status(404).send({ msg: 'Usuário não encontrado' })   
    
        }catch(error){    
            return res.status(501).send({ msg: error })
        }
    }

    async changePassword(req, res){

        try {
            const id = req.userID

            const { password } = req.body

            const newPasswordEncripited = bcrypt.hashSync( password, bcrypt.genSaltSync(10) )

            const result = await UserDB.findByIdAndUpdate(id, { password: newPasswordEncripited })
                    
            return result 
                ? res.status(200).send({ msg: 'ok' })
                : res.status(401).send({ msg: 'Usuário não encontrado' })   
    
        } catch (error) {
            return res.status(401).send({ msg: error })   
            
        }
        
    }

    async removeOne(req, res){
        const { id } = req.params
    
        try {

            const result = await UserDB.findByIdAndRemove(id)
    
            return result 
                ? res.status(200).send({ result })
                : res.status(404).send({ msg: 'Usuário não encontrado' })
    
        }catch(error){
    
            return res.status(501).send({ msg: error })
        }
    }
    
}

module.exports = new UserController()