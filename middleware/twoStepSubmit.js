var path = require('path');
var EMAIL_REGEX_PATTERN = require(path.join(__dirname, '../', 'config')).EMAIL_REGEX_PATTERN;
var crud = require('../lib/crud');

module.exports = function(req, res) {
  var params = req.body;
  var email = params.email;

  if (email.match(EMAIL_REGEX_PATTERN)) {
    crud.dbInsert(params);

    res.redirect('/success');
  } else {
    res.redirect('/failed');
  }
};