const { model, Schema } = require('mongoose')

module.exports = model('Article', new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    blog:{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    photo: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    likes:{
        type: Number,
        default: 0
    },
}, { timestamps: true } ))