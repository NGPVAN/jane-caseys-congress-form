
var forms = require('./forms');
var captcha = require('./captcha');
var postData = require('./post-data');
var test = require('./test');
var yaml = require('./yaml');
var cwc = require('./cwc');

function goHome(req,res){
  res.render('home');
}

function success(req,res){
  res.render('success');
}

function failure(req,res){
  res.render('failed');
}

function partial(req, res){
  res.render('partials/' + req.params.partial, {bioId : req.params.partial, isPartial: true});
}

//register routes
module.exports = function(router){

  router.get('/',goHome);
  router.get('/forms/',goHome);
  router.get('/forms/success',success);
  router.get('/forms/failed',failure);
  router.get('/success',success);
  router.get('/failed',failure);
  router.get('/partials/:partial', partial);

  router.post('/forms/submitFormData',forms.submitFormData);
  router.post('/forms/submitFormDataAlert',forms.submitFormDataAlert);

  //two step stuff
  router.post('/forms/twoStepTest',forms.twoStepTest);
  router.get('/forms/twoStepTwo',forms.twoStepTwo);
  router.post('/forms/twoStepSubmit',forms.twoStepSubmit);

  //captcha
  router.post('/forms/solveReCaptcha',captcha.solveRecaptcha);
  router.post('/forms/solveNewReCaptcha',captcha.solveNewRecaptcha);

  //post data
  router.get('/forms/postData',postData.legacyPostData); //legacy support
  router.post('/forms/postData',postData.legacyClearData); //legacy support

  router.get('/view/postData', postData.postDataView);
  router.get('/api/data',postData.getPostData); //ajax
  router.post('/api/data', postData.clearPostData);

  router.get('/forms/images',forms.renderImage);

  router.get('/forms/:bioId',forms.getCongressForm);

  // cwc
  router.get('/apiMessages/cwc/offices', cwc.houseOffices);
  router.get('/apiMessages/scwc/offices', cwc.senateOffices);
  router.post('/apiMessages/cwc', cwc.houseCwcSave);
  router.post('/apiMessages/scwc', cwc.senateCwcSave);

  // test stuff

  router.get('/test', test);
  router.get('/test/:status', test);
  router.post('/test', test);
  router.post('/test/:status', test);

  router.get('/testyaml/:yamlId', yaml);
  router.get('/testyaml/:status/:yamlId', yaml);
  router.get('/testyaml/:status/:delay/:yamlId', yaml);

  return router;
};