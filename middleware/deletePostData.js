var pg = require('pg');
var path = require('path');
var config = require(path.join(__dirname, '../', 'config'));


module.exports = function(req, res) {
  var data = '';

  // Get a Postgres client from the connection pool
  pg.connect(config.connectionString, function(err, client) {

    // SQL Query > Insert Data
    var query = client.query('DELETE FROM submissions;');

    // Stream results back one row at a time
    query.on('row', function(row) {
      data += row.payload;
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      client.end();

      if(data.length === 0) {
        data = 'No data';
      }

      res.render(config.VIEWS_DIR + 'postData', {postData: data});
    });

    // Handle Errors
    if(err) {
      console.log(err);
    }

  });
};