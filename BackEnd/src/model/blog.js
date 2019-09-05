const { model, Schema } = require('mongoose')

module.exports = model('Blog', new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    authors: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}))