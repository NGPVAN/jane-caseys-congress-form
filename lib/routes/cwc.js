var senateOfficeData = require('../data/scwc-offices.json');
var houseOfficeData = require('../data/cwc-offices.json');
var data = require('../data');
var xml = require('xml2js');
var _ = require('lodash');

function addData(payload){
  return data.SetData(payload, payload.email);
}

function constructPayload(req, type){
    // using the express.raw() middleware sets the req.body to a buffer that we can convert back into a string
    var xmlString = req.body.toString();
    return xml.parseStringPromise(xmlString).then(function(parsed){
        var email = _.get(parsed, 'CWC.Constituent[0].Email[0]') || 'no-email';
        return {
            cwcType: type,
            email: email,
            hasApiKey: req.query.apikey ? 'yes' : 'no',
            contentType: req.headers['content-type'],
            rawXml: xmlString
        };
    });
}

function houseCwcSave(req, res){

    constructPayload(req, 'House').then(function(payload){
        return addData(req, payload).then(function(){
            res.status(200).send();
        });  
    });   
  
}

function senateCwcSave(req, res) {

    constructPayload(req, 'Senate').then(function(payload){
        return addData(req, payload).then(function(){
            res.status(200).send();
        });
    });

}

function houseOffices(req, res){
    res.json(houseOfficeData);
}

function senateOffices(req, res){
    res.json(senateOfficeData);
}

module.exports = {
    houseCwcSave: houseCwcSave,
    senateCwcSave: senateCwcSave,
    houseOffices: houseOffices,
    senateOffices: senateOffices
};