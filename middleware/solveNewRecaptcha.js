var path = require('path');
var request = require('request');
var config = require(path.join(__dirname, '../', 'config'));
var crud = require('../lib/crud');

module.exports = function(req, res) {
  var params = req.body;
  var data = {
    secret: config.NEW_RECAPTCHA_PRIVATE_KEY,
    remoteip:  req.connection.remoteAddress,
    response:  req.body['g-recaptcha-response']
  };

  request.post('https://www.google.com/recaptcha/api/siteverify', {
    form: data
  }, function(err, resp, body) {
    body = JSON.parse(body);
    if (!err && body.success) {
      crud.dbInsert(params);
      res.redirect('/success');
    } else {
      res.redirect('/failed');
    }
  });
};