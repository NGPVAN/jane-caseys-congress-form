var uuid = require('uuid');

var pgData = require('./pg-promise-client')('dbo.JCPostData');
pgData.EnsureTable();

function setData(data,key){
  var id = uuid.v4();
  key = key || id;
  console.log('setting data', key);

  var actualData = {
    _id: id,
    key: key,
    body: data
  };

  return pgData.AddEdit(actualData,{_id:id});
}

function getData(id){

  return pgData.GetData({_id:id});

}

function getDataByKey(key){
  return pgData.GetData({key:key});
}

function getAllData(){
  console.log('getting all data');

  return pgData.GetData();
}

function clearData(id){

  console.log('clearing data: '+id);
  return pgData.Remove({_id:id});
}


function clearDataByKey(key){

  console.log('clearing data: '+key);
  return pgData.Remove({key:key});
}

function clearAll(){
  console.log('clearing ALL data');

  return pgData.Remove();
}

module.exports = {


  GetData: getData,
  GetDataByKey: getDataByKey,
  SetData: setData,
  ClearData: clearData,
  ClearDataByKey: clearDataByKey,
  ClearAll: clearAll,
  GetAllData: getAllData
};