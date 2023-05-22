import Joi from 'joi'

// In MongoDB, a 24 character hexadecimal string value for the new ObjectId is required
export const jIDSchema = Joi.object({
  id: Joi.string().length(24).hex().required(),
}).meta({ className: 'EventID' })

// Validation schema for /events?type=latest&limit=5&page=1 endpoint
const jEventPaginateSchema = Joi.object({
  type: Joi.string().valid('latest').default('latest'),
  limit: Joi.number().integer().min(1).max(50).default(10),
  page: Joi.number().integer().min(1).default(1),
}).meta({ className: 'EventQuery' })

// Conditional validation schema for /events endpoint
export const jGetEventsSchema = Joi.object({
  id: Joi.string().length(24).hex(),
}).when(Joi.object({ id: Joi.exist() }).unknown(), {
  then: jIDSchema,
  otherwise: jEventPaginateSchema,
})
