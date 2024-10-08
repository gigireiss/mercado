const multer = require('multer')

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "./src/public")
    },
    filename: function(req, file, cb) {
        let nome_sem_espaços = file.originalname.trim()
        let nome_array = nome_sem_espaços.split('')
        let nome_com_underLine = nome_array.join('_')
        return cb(null, `${Date.now()}_${nome_com_underLine}`)
    }
})

let upload = multer({ storage })

module.exports = upload