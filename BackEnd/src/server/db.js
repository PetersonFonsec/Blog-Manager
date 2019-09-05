const mongoose = require('mongoose')

mongoose.connect(process.env.DB_LINK ,{ useNewUrlParser: true }).catch( console.log )