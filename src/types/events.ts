/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface EventInputDTO {
  attendees?: string[]
  category: string
  description: string
  moderator: string
  name: string
  rigor_rank: number
  schedule: Date
  sub_category: string
  tagline: string
  uid?: string
}

export interface EventDTO extends EventInputDTO {
  files: string
  uid: string
}
