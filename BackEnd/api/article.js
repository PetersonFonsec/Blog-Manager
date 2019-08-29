const UserDB = require('../model/article')

const create = async (req, res) =>{
    const { name, password, email } = req.body

    if( !name || !password || !email ){
        return res.status(401).send({ msg: 'Campo Name, Password ou Email estão inválidos '})
    }

    try {
        const emailExist = await UserDB.findOne({ email })

        console.log(emailExist)

        return res.status(200).send({ msg: 'ok' })

    } catch (error) {
        return res.status(501).send({ msg: error })
    }

}
const findOne = (req, res)=>{

}
const find = (req, res)=>{

}
const updateOne = (req, res)=>{

}
const removeOne = (req, res)=>{

}

module.exports = { create, findOne, find, updateOne, removeOne }