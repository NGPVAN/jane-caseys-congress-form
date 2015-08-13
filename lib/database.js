var promise = require('promise');
var pg = require('pg-promise')(/*options*/);
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config')).connectionString;

var db = new pg(connectionString);

db.tx(function () {
    return promise.all([
        this.none('CREATE TABLE IF NOT EXISTS submissions(payload text, timestamp timestamptz DEFAULT NOW())'),
        this.none('CREATE OR REPLACE FUNCTION delete_old_rows() ' +
            'RETURNS trigger LANGUAGE plpgsql ' +
            'AS $$ BEGIN ' +
            'DELETE FROM submissions ' +
            'WHERE timestamp < NOW() - INTERVAL \'30 minutes\'; ' +
            'RETURN NULL; ' +
            'END; $$;'),
        this.none('DROP TRIGGER IF EXISTS trigger_delete_old_rows on submissions'),
        this.none('CREATE TRIGGER trigger_delete_old_rows AFTER INSERT ON submissions ' +
            'EXECUTE PROCEDURE delete_old_rows();')
    ]);
})
    .then(function () {
        process.exit();
    }, function (reason) {
        console.log(reason); // print error;
    });