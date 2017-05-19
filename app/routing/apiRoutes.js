var mysql = require('mysql');
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

module.exports = function(app) {
    app.get('/api/friends', function(req, res) {
        connection.query('SELECT * FROM users', function(err, data) {
            res.json(data);
        });
    });

    app.post('/api/friends', function(req, res) {
        console.log(req.body.name);
        console.log(req.body.photo);
        console.log(req.body.scores);

        // connection.query('INSERT INTO users SET ?', {
        //     name: req.body.name,
        //     photo: req.body.photo,
        //     scores: req.body.scores
        // }, function(err, result) {
        //     if (err) throw err;
        // });

        // connection.query('INSERT INTO users (name, photo, scores) VALUES (?, ?, ?)', [req.body.name, req.body.photo, req.body.scores], function(err, result) {
        //     if (err) throw err;
        // });

        // connection.query('INSERT INTO users (name, photo, scores) VALUES ('req.body.name', 'req.body.photo', 'req.body.scores')', function(err, result) {
        //     if (err) throw err;
        // });

        connection.query('SELECT * FROM users', function(err, data) {
            if (data.length) {
            	// compatibility logic
            } else {
            	// WOULD THIS WORK???
                res.send(alert('You are the first user!'));
            }
        });
    });
}
