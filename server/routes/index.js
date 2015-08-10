var express = require('express');
var pg = require('pg');
var path = require('path');
var request = require('request');
var router = express.Router();
var connectionString = require(path.join(__dirname, '../', '../', 'config')).connectionString;

var PUBLIC_KEY  = '6LeRdfQSAAAAAG_fUXud4U5gaiQStQ5nWEbUS8Sr',
    PRIVATE_KEY = '6LeRdfQSAAAAAGGvll55GUQHg9HEAKH9QjUrtG6j',
    NEW_RECAPTCHA_PUBLIC_KEY = '6LdRSAYTAAAAAIF6kPVGPOY-Mg6Qvwca0gdphFxN',
    NEW_RECAPTCHA_PRIVATE_KEY = '6LdRSAYTAAAAAIpObr2gN5Ua66yNj0GccY2Euft8',
    VIEWS_DIR = '../client/views/',
    ZIP_REGEX_PATTERN = /^[0-9]{5}$/,
    EMAIL_REGEX_PATTERN = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/ig;

function dbInsert(params) {
// Get a Postgres client from the connection pool
    pg.connect(connectionString, function (err, client, done) {

        // SQL Query > Insert Data
        client.query("INSERT INTO submissions(payload) values($1)", [params]);

        // Handle Errors
        if (err) {
            console.log(err);
        }

    });
}

router.get('/', function(req, res, next) {
  res.render(VIEWS_DIR + 'home');
});

router.get('/success', function(req, res, next) {
  res.render(VIEWS_DIR + 'success');
});

router.get('/failed', function(req, res, next) {
  res.render(VIEWS_DIR + 'failed');
});

router.get('/images', function(req, res, next) {
  var remainder = (new Date().getTime()) % 6;
  var imgPath = path.join(__dirname + '/../../client/images/captcha.jpg');
  if (remainder !== 0)
    imgPath = path.join(__dirname + '/../../client/images/captcha' + remainder + '.jpg');
  res.sendFile(imgPath, function (err){
    if (err) {
      console.log(err);
    }
  });
});

router.post('/submitFormData', function(req, res, next) {
    var params = req.body;
    dbInsert(params);

    res.render(VIEWS_DIR + 'success');
});

router.post('/submitFormDataAlert', function(req, res, next) {
    var params = req.body;
    dbInsert(params);

    res.render(VIEWS_DIR + req.body.bioid,{triggerAlert:true, bioId: req.body.bioid});
});

router.get('/postData', function(req, res, next) {
    var data = "";

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Insert Data
        var query = client.query("SELECT * FROM submissions ORDER BY timestamp ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
          data += row.payload + "\n";
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();

            if(data.length == 0) {
                data = "No data";
            }

            res.render(VIEWS_DIR + 'postData', {postData: data});
        });

        // Handle Errors
        if(err) {
            console.log(err);
        }

    });
});

router.post('/postData', function(req, res, next) {
    var data = "";

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Insert Data
        var query = client.query("DELETE FROM submissions;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            data += row.payload;
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();

            if(data.length == 0) {
                data = "No data";
            }

            res.render(VIEWS_DIR + 'postData', {postData: data});
        });

        // Handle Errors
        if(err) {
            console.log(err);
        }

    });
});

router.post('/twoStepTest', function(req, res, next) {
    var params = req.body;
    var zip = params.zipcode;

    if (zip.match(ZIP_REGEX_PATTERN)) {
        dbInsert(params);

        res.redirect('/twoStepTwo');
    } else {
        res.redirect('/failed');
    }
});

router.get('/twoStepTwo', function(req, res, next) {
    res.render(VIEWS_DIR + 'twoStepP2');
});


router.post('/twoStepSubmit', function(req, res, next) {
    var params = req.body;
    var email = params.email;

    if (email.match(EMAIL_REGEX_PATTERN)) {
        dbInsert(params);

        res.redirect('/success');
    } else {
        res.redirect('/failed');
    }
});

router.post('/solveRecaptcha', function(req, res, next) {
    var params = req.body;
    var data = {
        privatekey: PRIVATE_KEY,
        remoteip:  req.connection.remoteAddress,
        challenge: req.body.recaptcha_challenge_field,
        response:  req.body.recaptcha_response_field
    };

    request.post('http://www.google.com/recaptcha/api/verify', {
        form: data
    }, function(err, resp, body) {
        if (!err && body === 'true\nsuccess') {
            dbInsert(params);
            res.redirect('/success');
        } else {
            res.redirect('/failed');
        }
    });
});

router.post('/solveNewReCaptcha', function(req, res, next) {
    var params = req.body;
    var data = {
        secret: NEW_RECAPTCHA_PRIVATE_KEY,
        remoteip:  req.connection.remoteAddress,
        response:  req.body['g-recaptcha-response']
    };

    request.post('https://www.google.com/recaptcha/api/siteverify', {
        form: data
    }, function(err, resp, body) {
        body = JSON.parse(body);
        if (!err && body.success) {
            dbInsert(params);
            res.redirect('/success');
        } else {
            res.redirect('/failed');
        }
    });
});

router.get('/:bioId', function(req, res, next) {
    res.render(VIEWS_DIR + req.params.bioId,
        {
            publicKey: PUBLIC_KEY,
            newPublicKey: NEW_RECAPTCHA_PUBLIC_KEY,
            bioId: req.params.bioId
        }, function(err, html) {
            if(err) {
                console.log('cannot find view at ' + VIEWS_DIR + req.params.bioId);
                res.render(VIEWS_DIR + 'home'); // File doesn't exist
            } else {
                res.end(html);
            }
        });
});

module.exports = router;
