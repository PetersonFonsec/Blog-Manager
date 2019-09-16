const multer = require('multer')
const crypto = require('crypto')
const path   = require('path')

module.exports = {
    dest: path.resolve(__dirname, "..", "..", "uploads"),
    storage: multer.diskStorage({
        
        destination: (req, file, cb) => {
            cb( null ,path.resolve(__dirname, "..", "..", "uploads") )
        },
        
        fileName: (req, file, cb) => {
            const idUserLogged = req.userID
            crypto.randomBytes(5, (err, hash) =>{
                
                if(err) return cb(err)

                const fileName = `${idUserLogged}-${file.originalname}-${hash.toString('hex')}`
                
                cb(null, fileName)
            })
        }
    }),
    limits:{
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req,file,cb)=>{
        const extension = [
            'image/jpg',
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
        ]

        extension.includes(file.mimetype)
            ? cb(null, true)
            : cb(new Error('Invalid tipe extension'), true)
    }
}