var pgp = require('./pg-promise');
var _ = require('lodash');

function dataAccessor(table){


  function addEdit(data,where){
    return pgp.upsert(table,data,where);
  }

  function addEditMany(data, whereFunc){

    data = _.isArray(data) ? data : [data];
    whereFunc = _.isFunction(whereFunc) ?
      whereFunc : function(){return whereFunc;};

    return pgp.multi(function(q){

      _.forEach(data, function(item){
        var where = whereFunc(item);
        q.upsert(table,item,where);
      });

    });

  }

  function remove(where){
    return pgp.remove(table,where);
  }

  function removeMany(whereArr){
    return pgp.multi(function(q){
      _.forEach(whereArr,function(where){
        q.remove(table,where);
      });
    });
  }

  function getData(where){
    return pgp.select(table,where);
  }

  function getSingle(where){
    return getData(where).then(function(result){
      return _.isArray(result) ? result[0] : result;
    });
  }

  function ensureTable(){
    return pgp.ensureTable(table);
  }

  function resetTable(){
    return pgp.ensureTable(table,true);
  }

  return {
    EnsureTable: ensureTable,
    ResetTable: resetTable,
    AddEdit: addEdit,
    AddEditMany: addEditMany,
    Remove: remove,
    RemoveMany: removeMany,
    GetData : getData,
    GetSingle: getSingle
  };
}

module.exports = dataAccessor;