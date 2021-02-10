const mongoose = require('mongoose')

const Schema = mongoose.Schema

const searchSchema = new Schema(
	{
		query: { type: String, required: true, unique: true }
	},
	{
		timesTamps: true
	}
)

module.exports = mongoose.model('Query', searchSchema)
