import { Router } from 'express'
import event from './routes/event'

export default () => {
  const app = Router()
  event(app)

  return app
}
