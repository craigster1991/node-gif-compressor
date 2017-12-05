const multer = require('multer')
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, Date.now()+ '.' +extension)
  }
})
const mUpload = multer({ storage: storage }).single('gif')

module.exports = {
  upload: (req, res) => {
    return new Promise((resolve, reject) => {
      mUpload(req, res, function(err) {
        if (err) return reject(err)
        resolve({
          filename: req.file.filename,
          compression: req.body.compression,
          colours: req.body.colours,
        })
      })
    })
  }
}