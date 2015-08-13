var path = require('path');
var VIEWS_DIR = require(path.join(__dirname, '../', 'config')).VIEWS_DIR;
var crud = require('../lib/crud');

module.exports =  function(req, res) {
  var params = req.body;
  crud.dbInsert(params);

  res.render(VIEWS_DIR + req.body.bioid,{triggerAlert:true, bioId: req.body.bioid});
};