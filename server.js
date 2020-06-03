const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const ItemRouter = require('./routes/api/items')

const app = express()

app.use(bodyParser.json())

app.use('/api/items', ItemRouter)

const db = require('./config/keys').mongoURI
mongoose.connect(
  db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))