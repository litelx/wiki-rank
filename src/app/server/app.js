var express = require('express');
var cors = require('cors');
var bodyparser = require('body-parser');
var path = require('path');

var app = express();

// port number
const port = 3000;

const route = require('./routes/route');

// adding middleware - cores
app.use(cors());

// body - parser
app.use(bodyparser.json());

// static files
app.use(express.static(path.join(__dirname, 'src')));

// routes
app.use('/api', route);

app.listen(port, () => {
    console.log('Server started at port:', port);
});
