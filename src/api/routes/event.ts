import { Router, Request, Response, NextFunction } from 'express'
import { Modes, celebrate } from 'celebrate'
import { joiEventSchema } from '@/models/events'
import logger from '@/loaders/logger'
import middlewares from '../middlewares'
import EventService from '@/services/event'
import { EventInputDTO } from '@/types'
import validators from '../validators'
import Joi from 'joi'
import { ObjectId } from 'mongodb'
import celebrateOptions from '@/config/celebrate'
import { JSend } from '@/config/response'
import { jGetEventsSchema, jIDSchema } from '../../models/joi_schema'
import { EventID, EventPaginate, instanceOfEventID } from '@/types/event_params'

const route = Router()

export default (app: Router) => {
  app.use('/events', route)

  route.get(
    '/',
    celebrate({ query: jGetEventsSchema }, ...celebrateOptions),
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling / get endpoint with query: %o', req.query)
      try {
        let result
        if (instanceOfEventID(req.query)) {
          logger.debug('id')
          result = await EventService.GetEvent(req.query.id)
        } else {
          logger.debug('paginate')
          result = await EventService.GetLatestEvents(req.query as unknown as EventPaginate)
        }
        return res.status(201).json(JSend.success(result))
      } catch (e) {
        logger.error('🔥 error: %o', e)
        next(e)
      }
    },
  )

  route.post(
    '/',
    middlewares.uploadImage.single('files'),
    validators.imageFile,
    celebrate({ body: joiEventSchema }, ...celebrateOptions),
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling / post endpoint with body: %o', req.body)

      try {
        const input = req.body as EventInputDTO
        const uid = await EventService.AddEvent(input, req.file)
        return res.status(201).json(JSend.success({ uid: uid }))
      } catch (e) {
        logger.error('🔥 error: %o', e)
        next(e)
      }
    },
  )

  route.put(
    '/:id',
    middlewares.uploadImage.single('files'),
    validators.imageFile,
    celebrate(
      {
        body: joiEventSchema,
        params: jIDSchema,
      },
      ...celebrateOptions,
    ),
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling /:id put endpoint with body: %o\nparams: %o', req.body, req.params)

      try {
        const input = req.body as EventInputDTO
        const uid = await EventService.UpdateEvent(input, req.params.id, req.file)
        return res.status(201).json(JSend.success({ uid: uid }))
      } catch (e) {
        logger.error('🔥 error: %o', e)
        next(e)
      }
    },
  )

  route.delete(
    '/:id',
    celebrate(
      {
        params: jIDSchema,
      },
      ...celebrateOptions,
    ),
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling /:id delete endpoint with id: %o', req.params)
      try {
        const id = req.params.id
        await EventService.DeleteEvent(id)
        return res.status(201).json(JSend.success({ uid: id }))
      } catch (e) {
        logger.error('🔥 error: %o', e)
        next(e)
      }
    },
  )
}
