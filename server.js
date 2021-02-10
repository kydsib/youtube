const express = require('express')

const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.port || 5000

app.use(cors())
app.use(express.json())

app.get('/api/hello', (req, res) => {
	res.send({ express: 'Hello From Express' })
})

app.post('/api/world', (req, res) => {
	console.log(req.body)
	res.send(
		`I received your POST request. This is what you sent me: ${req.body.post}`
	)
})

app.listen(port, () => console.log(`Listening on port ${port}`))
