var path = require('path');
var request = require('request');
var config = require(path.join(__dirname, '../', 'config'));
var crud = require('../lib/crud');

module.exports =  function(req, res) {
  var params = req.body;
  var data = {
    privatekey: config.PRIVATE_KEY,
    remoteip:  req.connection.remoteAddress,
    challenge: req.body.recaptcha_challenge_field,
    response:  req.body.recaptcha_response_field
  };

  request.post('http://www.google.com/recaptcha/api/verify', {
    form: data
  }, function(err, resp, body) {
    if (!err && body === 'true\nsuccess') {
      crud.dbInsert(params);
      res.redirect('/success');
    } else {
      res.redirect('/failed');
    }
  });
};