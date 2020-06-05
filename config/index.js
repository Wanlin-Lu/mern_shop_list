const dotenv = require('dotenv')

dotenv.config()

const ENV = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET
}

module.exports = ENV