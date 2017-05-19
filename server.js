var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();
var port = process.env.PORT || 8080;

app.use(express.static('app/public')); // include this line if you want to include css, other javascript, etc. that is linked/scripted to your html (it makes the entire denoted folder available to the client)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var connection;
if (process.env.JAWSDB_URL) {
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
	connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'pass',
		database: 'friendfinderdb'
	});
}

connection.connect(function(err) {
	if (err) throw err;
	console.log('connected as id ' + connection.threadId);
});

require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

app.listen(port, function() {
	console.log('listening on port ' + port);
});