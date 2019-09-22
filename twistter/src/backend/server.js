const port = 4000;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dbName = "twistter";
const app = express();
const dbConnectionString = 'mongodb+srv://murugand:lebronjames@twistter-herwc.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(dbConnectionString, { useNewUrlParser: true });
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(port, function() {
	console.log(`Server is listening on port ${port}`);
})

app.get('/hello', function(request, res) {
	res.send({
		data: "Hello World!"
	})
})
