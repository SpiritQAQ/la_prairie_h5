import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

import HttpException from '../exceptions/HttpException'
import { INTERNAL_SERVER_ERROR } from 'http-status-codes'

const errorMiddleware = (
  error: HttpException,
  _request: NextApiRequest,
  response: NextApiResponse,
  next: NextResponse
) => {
  const message = error.message || 'Something was wrong'
  const status = error.status || INTERNAL_SERVER_ERROR
  response.status(status).json({
    success: false,
    message,
  })

  next()
}

export default errorMiddleware
