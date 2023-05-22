import { ClientError } from '@/config/response'
import logger from '@/loaders/logger'
import { EventModel } from '@/models/events'
import { EventDTO, EventInputDTO } from '@/types'
import { EventPaginate } from '@/types/event_params'
import { ObjectId } from 'mongodb'
const cloudinary = require('cloudinary').v2

export default {
  GetEvent: async (id: string): Promise<EventDTO> => {
    const result = await EventModel.findOne({ uid: new ObjectId(id) })
    if (!result) {
      throw new ClientError({ id: `${id} does not exist` }, 404)
    }
    return result
  },

  GetLatestEvents: async (query: EventPaginate): Promise<EventDTO[]> => {
    const skip = (query.page - 1) * query.limit
    const result = await EventModel.find().sort({ schedule: -1 }).limit(query.limit).skip(skip)
    if (!result) {
      throw new ClientError({ events: `There are no events` }, 404)
    }
    return result
  },

  AddEvent: async (eventDTO: EventInputDTO, file): Promise<string> => {
    try {
      const uploadResult = await cloudinary.uploader.upload(file.path)
      if (uploadResult.secure_url) {
        const document = await EventModel.create({ ...eventDTO, files: uploadResult.secure_url })
        return document.get('uid')
      } else {
        throw new Error('Failed to upload file to Cloudinary')
      }
    } catch (error) {
      logger.error(error)
      throw error
    }
  },

  DeleteEvent: async (id: string): Promise<boolean> => {
    const result = await EventModel.deleteOne({ uid: id })

    if (result.deletedCount === 0) {
      throw new ClientError({ id: `${id} does not exist` }, 404)
    }
    if (!result.acknowledged) {
      throw new Error(`Failed to delete ${id}`)
    }
    return result.acknowledged
  },
}
