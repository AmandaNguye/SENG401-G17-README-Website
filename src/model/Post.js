const { Double, Int32, ObjectId } = require("mongodb")
const mongoose = require("mongoose")

const schema = mongoose.Schema({
	title: String,
	content: String,
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    tags: [String],
    fame: Number,
    lame: Number,
})

module.exports = mongoose.model("Post", schema)