var request = require('request');
var path = require('path');

var config = require('../../config');

var ZIP_REGEX_PATTERN = /^[0-9]{5}$/,
    EMAIL_REGEX_PATTERN = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/ig;

var data = require('../data');


function twoStepTest(req, res) {
  var zip = req.body.zipcode;

  if (zip.match(ZIP_REGEX_PATTERN)) {
    data.SetData(req.body);
    res.redirect('/forms/twoStepTwo');
  } else {
    res.redirect('/forms/failed');
  }
}

function twoStepTwo(req, res) {
  res.render('twoStepP2');
}

function twoStepSubmit(req, res) {
  var email = req.body.email;

  if (email.match(EMAIL_REGEX_PATTERN)) {
    data.SetData(req.body);
    res.redirect('/forms/success');
  } else {
    res.redirect('/forms/failed');
  }
}

function getCongressForm(req, res) {
  res.render('forms/' + req.params.bioId,
    {
      publicKey: config.captcha.old.publicKey,
      newPublicKey: config.captcha.new.publicKey,
      bioId: req.params.bioId
    }, function(err, html) {
      if(err) {
        console.log('cannot find view at forms/' + req.params.bioId);
        res.render('home', {error: 'view '+req.params.bioId+' does not exist'});
      } else {
        res.end(html);
      }
    });
}

function submitFormData(req, res) {
  data.SetData(req.body).then(function(){
    res.render('success');
  }).catch(function(err){
    console.log(err);
    res.render('home',{error:err});
  });
}

function submitFormDataAlert(req, res) {
  data.SetData(req.body).then(function(){
    var payload = {triggerAlert:true, bioId: req.body.bioid};
    res.render('forms/' + req.body.bioid,payload);
  }).catch(function(err){
    console.log(err);
    res.render('home',{error:err});
  });
}

function renderImage(req, res) {
  var remainder = (new Date().getTime()) % 6;
  var imgPath = path.join(__dirname + '/../../public/img/captcha.jpg');
  if (remainder !== 0)
    imgPath = path.join(__dirname + '/../../public/img/captcha' + remainder + '.jpg');
  res.sendfile(imgPath, function (err){
    if (err) {
      console.log(err);
    }
  });
}

module.exports = {
  twoStepTest: twoStepTest,
  twoStepTwo: twoStepTwo,
  twoStepSubmit: twoStepSubmit,
  getCongressForm: getCongressForm,
  submitFormData: submitFormData,
  submitFormDataAlert: submitFormDataAlert,
  renderImage:renderImage
};