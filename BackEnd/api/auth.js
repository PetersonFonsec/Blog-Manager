const UserDB = require('../model/user')
const bcripty = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')

const createToken = payload => jwt.sign(payload, process.env.HASH, { expiresIn: 6000 } )

const Login =  async (req, res) => {

    const { email, password } = req.body

    try {

        const result = await UserDB.findOne({ email }).select('+password')

        if(!result) return res.status(401).send({ msg: 'Usuário não encontrado' })

        const isMach = bcripty.compareSync(password, result.password)

        if(!isMach) return res.status(401).send({ msg: 'Senha ou Email incorretos' })

        const { _id, admin } = result

        const token = createToken({ _id, admin })

        delete result.password

        res.status(200).send({ result, token })

    }catch(error){
        res.status(501).send({ msg: error })
    }
}

const userAdmin = middleware => {
    return (req, res, next) => req.admin 
        ? middleware(req, res, next) 
        : res.status(401).send('Usuário não é admin')
}

const validToken = (req, res, next) => {
    const { authorization } = req.headers

    if(!authorization) return res.status(401).send({ error: 'Token não enviado'})

    const parts = authorization.split(' ')
    
    if(!parts.length === 2) return  res.status(401).send({ error: 'Token inválido'})
    
    const [ bearer, token ] = parts

    if(!/^Bearer$/i.test(bearer)) return  res.status(401).send({ error: 'Token inválido'})
    
    jwt.verify(token, process.env.HASH, (error, decoded) => {
        if(error) return res.status(401).send({ error })

        req.userID = decoded._id
        req.admin  = decoded.admin

        next()
    })
}

module.exports = { Login, userAdmin, validToken, createToken }