const { model, Schema } = require('mongoose')

module.exports = model('User', new Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'avatar-default'
    },
    admin: {
        type: Boolean,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    resetPasswordToken:{
        type: String,
        select: false,
    },
    resetValidToken:{
        type: String,
        select: false,
    }
}))