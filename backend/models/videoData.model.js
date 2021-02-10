const mongoose = require('mongoose')

const Schema = mongoose.Schema

const videoDataSchema = new Schema(
	{
		description: { type: String, required: true, unique: true }
	},
	{
		timesTamps: true
	}
)

module.exports = mongoose.model('VideoData', videoDataSchema)
