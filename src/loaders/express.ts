import express from 'express'
import cors from 'cors'
import routes from '@/api'
import config from '@/config'
import { CelebrateError, errors, isCelebrateError } from 'celebrate'
import logger from './logger'
import EscapeHtml from 'escape-html'
import { MulterError } from 'multer'
import { ClientError, JSend } from '@/config/response'
import { MongoError } from 'mongodb'

export default ({ app }: { app: express.Application }) => {
  app.get('/status', (req, res) => {
    res.status(200).end()
  })
  app.head('/status', (req, res) => {
    res.status(200).end()
  })

  // Useful if you're behind a reverse proxy (Heroku, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy')

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors())

  // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  app.use(require('method-override')())

  // Transforms the raw string of req.body into json
  app.use(express.json())

  // Load API routes
  app.use(config.api.prefix, routes())

  // Celebrate library and Multer error handler
  app.use((err, req, res, next) => {
    if (isCelebrateError(err)) {
      const failData = {}
      for (const [segment, joiError] of err.details.entries()) {
        joiError.details.map((detail) => {
          failData[EscapeHtml(detail.path.join('.'))] = detail.message
        })
      }
      return res.status(400).send(JSend.fail(failData))
    }
    if (err instanceof ClientError) {
      return res.status(err.code ?? 400).send(JSend.fail(err.data))
    }
    if (err instanceof MulterError) {
      const field = err.field ?? 'File'
      return res.status(400).send(JSend.fail({ [field]: err.message }))
    }
    // if (err instanceof MongoError) {
    //   logger.debug(err.code)
    //   if (err.code === 11000) {
    //     return res.status(400).send(JSend.fail({ id: 'That ID already exist' }))
    //   }
    // }

    return next(err)
  })

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found')
    err['status'] = 404
    next(err)
  })

  /// error handlers
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json(JSend.error(err.message))
  })
}
