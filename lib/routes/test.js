

module.exports = function(req, res){
  
  var status = req.params.status || 200;
  var delay = Number(req.query.delay || 0);
  var msg = req.query.msg || 'None';
  
  if(delay && delay > 0 && delay <= 300){ // 5 minutes
    setTimeout(function(){
      res.status(status).render('test', { status: status, delay: delay, message: msg });
}, delay * 1000);
  } else {
    res.status(status).render('test', { status: status, delay: 'None', message: msg });
  }

};