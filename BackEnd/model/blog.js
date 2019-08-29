const { model, Schema } = require('mongoose')

module.exports = model('Blog', new Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    authors: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}))