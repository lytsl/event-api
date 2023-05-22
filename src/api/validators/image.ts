import { JSend } from '@/config/response'
import path from 'path'

export default function imageFile(req, res, next) {
  if (!req.file || !req.file.path) {
    return res.status(400).json(JSend.fail({ files: 'An image file is required' }))
  }

  const allowedExtensions = ['.png', '.jpg', '.jpeg']
  const fileExtension = path.extname(req.file.originalname).toLowerCase()

  if (!allowedExtensions.includes(fileExtension)) {
    return res.status(400).json(JSend.fail({ files: 'Only PNG, JPG and JPEG formats are allowed' }))
  }

  next()
}
