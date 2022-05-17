import config from 'config'
import mongoose from 'mongoose'

async function connect(): Promise<void> {
  const uri: string = config.get<string>('mongoUri')
  await mongoose.connect(uri)
  mongoose.connection.on('error', console.error)
}

export { connect }