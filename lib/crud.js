var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config')).connectionString;

function dbInsert(params) {
// Get a Postgres client from the connection pool
    pg.connect(connectionString, function (err, client) {

        // SQL Query > Insert Data
        client.query('INSERT INTO submissions(payload) values($1)', [params]);

        // Handle Errors
        if (err) {
            console.log(err);
        }

    });
}

module.exports = {
    dbInsert: dbInsert
};