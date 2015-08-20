var path = require('path');
var ZIP_REGEX_PATTERN = require(path.join(__dirname, '../', 'config')).ZIP_REGEX_PATTERN;
var crud = require('../lib/crud');

module.exports = function(req, res) {
  var params = req.body;
  var zip = params.zipcode;

  if (zip.match(ZIP_REGEX_PATTERN)) {
    crud.dbInsert(params);

    res.redirect('/twoStepTwo');
  } else {
    res.redirect('/failed');
  }
};