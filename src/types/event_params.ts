export interface EventID {
  id: string
}

export function instanceOfEventID(object: any): object is EventID {
  return 'id' in object
}

export interface EventPaginate {
  type: string
  limit: number
  page: number
}
