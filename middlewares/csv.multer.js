const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/public/templ/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname)
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = {upload};