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

var friends;
var user;

module.exports = function(app) {
    app.get('/api/friends', function(req, res) {
        connection.query('SELECT * FROM users', function(err, data) {
            friends = data;
            res.json(friends);
        });
    });

    app.post('/api/friends', function(req, res) {
        connection.query('SELECT * FROM users', function(err, data) {
            friends = data;

            user = req.body;
            userScores = user.scores;

            var totalArray = [];

            for (var i = 0, n = friends.length; i < n; i++) {
                var total = 0;
                for (var j = 0, o = JSON.parse(friends[i].scores).length; j < o; j++) {
                    total += Math.abs(parseInt(userScores[j]) - parseInt(JSON.parse(friends[i].scores)[j]));
                }
                totalArray.push(total);
            }

            var lowestIndex = 0;

            for (var i = 1, n = totalArray.length; i < n; i++) {
                if (totalArray[i] <= totalArray[lowestIndex]) {
                    lowestIndex = i;
                }
            }

            res.json(friends[lowestIndex]);
            
            connection.query('INSERT INTO users SET ?', {
                name: req.body.name,
                photo: req.body.photo,
                scores: JSON.stringify(req.body.scores)
            }, function(err, result) {
                if (err) throw err;
            });

            // res.json(friends[lowestIndex]);
            // if (friends.filter(function(friend) { friend.name === req.body.name }).length = 0) {
            //     connection.query('INSERT INTO users SET ?', {
            //         name: req.body.name,
            //         photo: req.body.photo,
            //         scores: JSON.stringify(req.body.scores)
            //     }, function(err, result) {
            //         if (err) throw err;
            //     });
            // }

            // if (friends.filter(function(friend) { friend.name === req.body.name }).length > 0) {
            //     res.json(friends[lowestIndex]);
            // } else {
            //     res.json(friends[lowestIndex]);
            //     connection.query('INSERT INTO users SET ?', {
            //         name: req.body.name,
            //         photo: req.body.photo,
            //         scores: JSON.stringify(req.body.scores)
            //     }, function(err, result) {
            //         if (err) throw err;
            //     });
            // }

            // console.log(totalArray.join());
            // console.log(Math.min(totalArray.join()));
            // console.log(totalArray.indexOf(Math.min(totalArray.join())));

            // connection.query('INSERT INTO users (name, photo, scores) VALUES (?, ?, ?)', [req.body.name, req.body.photo, req.body.scores], function(err, result) {
            //     if (err) throw err;
            // });

            // connection.query('INSERT INTO users (name, photo, scores) VALUES ('
            //     req.body.name ', '
            //     req.body.photo ', '
            //     req.body.scores ')',
            //     function(err, result) {
            //         if (err) throw err;
            //     });

        });
    });
}
