export interface Message {
  _id: string
  message: string
  author: string
  createdAt: string
}

export interface BadRequestError {
  error: string
  details: {
    msg: string
    param: string
    location: string
  }[]
}

export interface InternalServerError {
  error: {
    message: string
    createdAt: string
  }
}

export type ApiError = BadRequestError | InternalServerError
