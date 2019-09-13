const port = 4000;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.listen(port, function() {
	console.log(`Server is listening on port ${port}`);
})

app.get('/hello', function(request, res) {
	res.send({
		data: "Hello World!"
	})
})

