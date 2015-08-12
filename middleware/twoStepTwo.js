var path = require('path');
var VIEWS_DIR = require(path.join(__dirname, '../', 'config')).VIEWS_DIR;

module.exports =  function(req, res) {
  res.render(VIEWS_DIR + 'twoStepP2');
};