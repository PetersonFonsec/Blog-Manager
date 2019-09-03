const UserDB = require('../model/user')
const bcrypt = require('bcrypt-nodejs')
const { createToken } = require('../api/auth')

const create = async (req, res) =>{
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

const createAdmin = async (req, res) =>{
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

        return res.status(200).send({ result, token })

    } catch (error) {

        return res.status(501).send({ msg: error })
    }

}

const findOne = async (req, res)=>{
    try {
        const { id } = req.params

        const result = await UserDB.findOne({ _id : id })

        if(result){
            return res.status(200).send({ result })
        }else{
            return res.status(404).send({ msg: 'Usuário não encontrado' })
        }

    }catch(error) {
        return res.status(501).send({ msg: error })
    }
}

const find = async (req, res)=>{
    try {
        const result = await UserDB.find()

        return res.status(200).send({ result })

    }catch(error) {
        return res.status(501).send({ msg: error })
    }
}

const updateOne = async (req, res)=>{
    const { id } = req.params
    const { name, email } = req.body

    try {

        const result = await UserDB.findOneAndUpdate({ _id: id }, { name,  email } )

        if(result){
            return res.status(200).send({ result })
        }else{
            return res.status(404).send({ msg: 'Usuário não encontrado' })
        }        

    }catch(error){

        return res.status(501).send({ msg: error })
    }
}

const removeOne = async (req, res)=>{
    const { id } = req.params

    try {

        const result = await UserDB.deleteOne({ _id: id })

        return res.status(200).send({ result })

    }catch(error){

        return res.status(501).send({ msg: error })
    }
}

module.exports =   { create, findOne, find, updateOne, removeOne, createAdmin }