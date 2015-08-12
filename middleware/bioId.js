var path = require('path');
var config = require(path.join(__dirname, '../', 'config'));

module.exports = function(req, res) {
    res.render(config.VIEWS_DIR + req.params.bioId,
        {
            publicKey: config.PUBLIC_KEY,
            newPublicKey: config.NEW_RECAPTCHA_PUBLIC_KEY,
            bioId: req.params.bioId
        }, function(err, html) {
            if(err) {
                console.log('cannot find view at ' + config.VIEWS_DIR + req.params.bioId);
                res.render(config.VIEWS_DIR + 'home'); // File doesn't exist
            } else {
                res.end(html);
            }
        });
};