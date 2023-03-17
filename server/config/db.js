const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    const connection = conn.connection
    console.log(`Connected on ${connection.host}:${connection.port}`)
  } catch (error) {
    console.log('Cannot connect to database')
    process.exit(1)
  }
}

module.exports = connectDB
