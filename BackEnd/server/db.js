const mongoose = require('mongoose')

mongoose.connect(process.env.DBLINK ,{ useNewUrlParser: true }).catch( console.log )
