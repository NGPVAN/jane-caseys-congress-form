/**
 * This is a self-contained module that defines its routes,
 * callbacks, models and views all internally.
 * Such approach to code organization follows the recommendations of TJ:
 *
 * http://vimeo.com/56166857
 *
 */

// Third-party libraries
var express = require('express'),
    exports = module.exports = express(),
    app = exports;

// Don't just use,
// but also export in case another module needs to use these as well.
exports.callbacks    = require('./lib/forms/controllers/forms');

app.set('view engine', 'jade');

// Module's Routes.
app.get('/', exports.callbacks.goJane);
app.post('/solveReCaptcha', exports.callbacks.solveRecaptcha);
app.post('/solveNewReCaptcha', exports.callbacks.solveNewRecaptcha);
app.get('/success', exports.callbacks.success);
app.get('/failed', exports.callbacks.failed);
app.post('/twoStepTest', exports.callbacks.twoStepTest);
app.get('/twoStepTwo', exports.callbacks.twoStepTwo);
app.post('/twoStepSubmit', exports.callbacks.twoStepSubmit);
app.get('/postData', exports.callbacks.postData);
app.post('/postData', exports.callbacks.deletePostData);
app.get('/images', exports.callbacks.renderImage);
app.get('/:bioId', exports.callbacks.getCongressForm);
app.post('/submitFormData', exports.callbacks.submitFormData);
app.post('/submitFormDataAlert', exports.callbacks.submitFormDataAlert);

