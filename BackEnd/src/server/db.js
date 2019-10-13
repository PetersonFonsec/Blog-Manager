const mongoose = require('mongoose')

mongoose.connect(process.env.DB_LINK ,{ 
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
 }).catch( console.log )
