const UserDB = require('../model/user')
const bcripty = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')

const createToken = payload => 
    jwt.sign(payload, process.env.HASH, { expiresIn: 6000 } )

const validToken = token => jwt.verify(token, process.env.HASH)

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

module.exports = { Login, validToken }