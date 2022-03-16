import mongoose from 'mongoose'
import nextConnect from 'next-connect'
import HttpException from './exceptions/HttpException'

const uri = process.env.MONGODB_URI || ''

// const app = nextConnect()

// route

const setupMongo = () =>
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

export default setupMongo
