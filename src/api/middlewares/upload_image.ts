import multer from 'multer'
import path from 'path'
import config from '@/config'
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads/'), // cb -> callback
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(
      file.originalname,
    )}`
    cb(null, uniqueName)
  },
})

function checkFileType(req, file, cb) {
  const filetypes = /jpeg|jpg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb(null, false)
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * config.max_image_size },
  // fileFilter: function (_req, file, cb) {
  //   checkFileType(_req, file, cb)
  // },
})

export default upload
