// follows JSend format

const JSend = {
  // All went well, and (usually) some data was returned.
  success: (responseData) => ({
    status: 'success',
    data: responseData,
  }),

  // There was a problem with the data submitted, or some pre-condition of the API call wasn't satisfied
  fail: (responseData) => ({
    status: 'fail',
    data: responseData,
  }),

  // An error occurred in processing the request, i.e. an exception was thrown
  error: (errorMessage: string) => ({
    status: 'error',
    message: errorMessage,
  }),
}

class ClientError extends Error {
  data: any
  code?: number
  constructor(data: any, code?: number) {
    super('Bad Request')
    this.data = data
    this.code = code
  }
}

export { JSend, ClientError }
