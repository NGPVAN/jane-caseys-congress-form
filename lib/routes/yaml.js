var fs = require('fs');
var _ = require('lodash');

module.exports = function(req, res){

    var id = req.params.yamlId;
    var status = Number(req.params.status || 200);
    var delay = Number(req.params.delay || 0);
    delay = delay >= 0 && delay <= 300 /* 5 minutes */ ? delay : 0;

    setTimeout(function(){
        var response = res.status(status).append('Content-Type','text/plain; charset=utf-8');
    
        if(!id){
            return response.send('No ID');
        }
    
        if(!_.endsWith(id, '.yaml')){
            id += '.yaml';
        }
    
        fs.readFile(__dirname + '../../../members/' + id, {encoding: 'utf8'}, function(err, data){
            if(err){
                data = 'Not Found';
            }
            response.send(data);
        });
    }, delay * 1000);
};