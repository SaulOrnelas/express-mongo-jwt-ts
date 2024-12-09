import mongoose from 'mongoose'

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL || 'http://localhost:27017')
    console.log('Database online')
  } catch (error) {
    console.log(error)
    throw new Error('Error to start database')
  }
}

export { dbConnection };
