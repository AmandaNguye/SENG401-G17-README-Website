const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes")
require('dotenv').config();

const password = process.env.MONGODB_PASSWORD;
const username = process.env.MONGODB_USERNAME;

// Connect to MongoDB database
mongoose
	.connect(`mongodb+srv://${username}:${password}@cluster0.mw5kc.mongodb.net/seng401?retryWrites=true&w=majority`, { useNewUrlParser: true })
	.then(() => {
		const app = express()
		app.use(express.json())
		app.use("/api", routes)
		
		app.listen(5000, () => {
			console.log("Server has started!")
		})
	})
	.catch(e => console.log('Fail Start Up'));


