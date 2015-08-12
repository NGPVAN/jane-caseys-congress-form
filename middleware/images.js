var path = require('path');

module.exports = function(req, res) {
  var remainder = (new Date().getTime()) % 6;
  var imgPath = path.join(__dirname + '/../client/images/captcha.jpg');
  if (remainder !== 0)
    imgPath = path.join(__dirname + '/../client/images/captcha' + remainder + '.jpg');
  res.sendFile(imgPath, function (err){
    if (err) {
      console.log(err);
    }
  });
};

