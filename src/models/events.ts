import Joi from 'joi'
import Mongoose from 'mongoose'
const Joigoose = require('joigoose')(Mongoose, null, {
  _id: false,
  timestamps: false,
})

export const joiEventSchema = Joi.object({
  uid: Joi.string().meta({
    _mongoose: { type: 'ObjectId', unique: true, index: true, auto: true },
  }),
  name: Joi.string().max(20).required(),
  tagline: Joi.string().max(20).required(),
  schedule: Joi.date()
    .iso()
    .required()
    .meta({
      _mongoose: { type: 'Date', index: true },
    }),
  description: Joi.string().max(255).required(),
  files: Joi.string(),
  moderator: Joi.string().max(20).required(),
  category: Joi.string().max(20).required(),
  sub_category: Joi.string().max(20).required(),
  rigor_rank: Joi.number().required(),
  attendees: Joi.array().items(Joi.string().max(20)),
}).meta({ className: 'EventDTO' })

var mongooseEventSchema = new Mongoose.Schema(Joigoose.convert(joiEventSchema))
export const EventModel = Mongoose.model('Event', mongooseEventSchema)

// import { EventDTO } from '@/types/event'
// import mongoose from 'mongoose'

// import { getModelForClass, prop } from '@typegoose/typegoose'
// import { ObjectId } from 'mongoose'

// const ImageSchema = new mongoose.Schema({
//   data: Buffer,
//   contentType: String,
// })

// const maxFileSizeMB = 5

// function validateImageSize(value: Buffer) {
//   const maxFileSize = maxFileSizeMB * 1024 * 1024 // 5 MB in bytes
//   return value.length > maxFileSize
// }

// class Image {
//   @prop({ required: true })
//   name!: string

//   @prop({
//     required: true,
//     get: (value: Buffer) => value.toString('base64'), // Convert binary data to base64 string for serialization
//     set: (value: string) => Buffer.from(value, 'base64'), // Convert base64 string back to binary data for deserialization
//     validate: {
//       validator: (value: Buffer) => value.length < maxFileSizeMB * 1024 * 1024,
//       message: 'Image size exceeds the maximum allowed size of 5MB',
//     },
//   })
//   data!: Buffer

//   @prop({ required: true })
//   contentType!: string
// }

// export class EventClass {
//   @prop({ auto: true, unique: true, index: true })
//   public readonly uid!: ObjectId

//   @prop({ required: true, maxlength: 20 })
//   public name!: string

//   @prop({ required: true, maxlength: 20 })
//   public tagline!: string

//   @prop({ required: true, index: true })
//   public schedule!: Date

//   @prop({ required: true, maxlength: 255 })
//   public description!: string

//   @prop({
//     type: () => [Image],
//     required: true,
//     validate: { validator: (v: any[]) => v.length <= 5 },
//     message: 'Maximum 5 images allowed',
//   })
//   public files!: Image[]

//   @prop({ required: true, maxlength: 20 })
//   public moderator!: string

//   @prop({ required: true, maxlength: 20 })
//   public category!: string

//   @prop({ required: true, maxlength: 20 })
//   public sub_category!: string

//   @prop({ required: true })
//   public rigor_rank!: number

//   @prop({ type: String })
//   public attendees?: string[]
// }

// export const EventModel = getModelForClass(EventClass)
