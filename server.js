var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.database, function(err){
	if(err){
		console.log(err);
	}
	else{
		console.log('Connected to the database');
	}
});

var app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

var api = require('./app/routes/api')(app, express);
app.use('/api', api);

app.get('*', function(req, res){

	res.sendFile(__dirname + '/public/app/views/index.html');
});

app.listen(config.port, function(err){
	if(err){
		console.log(err);
	}
	else{
		console.log('Server is listening on port: ' + config.port + '  | Url: http://localhost:' + config.port);
	}
});