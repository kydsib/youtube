const express = require('express')
const axios = require('axios') // mine
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.port || 3000

const API_KEY = 'AIzaSyB2u0Cpajl8SbEsVbTub-_9XOD3funQHRQ'

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
// mongoose.connect(uri, { userNewUrlParses: true, useCreateIndex: true })

const connection = mongoose.connection
connection.once('open', () => {
	console.log('MongoDB database connection established successfully')
})

// const searchRouter = require('./routes/searches')
// const videoRouter = require('./routes/videos')

// app.use('/searches', searchRouter)
// app.use('/videos', videoRouter)

// app.get('/', (req, res) => res.send('Hi'))

app.listen(port, () => {
	console.log('Server is running')
})
