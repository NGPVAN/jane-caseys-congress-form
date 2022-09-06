var pgp = require('pg-promise')();
var config = require('../../config');
var _ = require('lodash');
var BPromise = require('bluebird');
var log = require('../log');


var pgConfig = {
  database: 'postgres',
  ssl: {
    rejectUnauthorized: false // heroku uses self-signed certs
  }
};

if (config.postgres.url) {
  pgConfig.connectionString = config.postgres.url;
} else {
  pgConfig.host = config.postgres.server;
  pgConfig.user = config.postgres.username;
  pgConfig.password = config.postgres.password;
}

if ((pgConfig.connectionString && pgConfig.connectionString.includes('localhost')) || pgConfig.host == 'localhost') {
  pgConfig.ssl = false;
}

var db = pgp(pgConfig);


// -------------------------------- //
// Helper Functions                 //
// -------------------------------- //

// repackage pg-promise's version of a promise into a bluebird one
function properPromise(prom){
  return new BPromise(function(resolve,reject){
    prom.then(function(result){
      resolve(result);
    },function(err){
      reject(err);
    });
  });
}

function toSafeJson(data){
  if(!data) return undefined;
  return JSON.stringify(data);
}

function packageQuery(q,params){
  return {
    query: q,
    params: !params ? [] : !_.isArray(params) ? [params] : params
  };
}

function parseTable(table){

  var schema = 'dbo';
  if(table.indexOf('.')>=0){
    var split = table.split('.');
    schema = split[0];
    table  = split[1];
  }

  var full = schema + '.'+table;

  return {
    schema: schema,
    table: table,
    full: full
  };
}

// -------------------------------- //
// Query Builder Functions          //
// -------------------------------- //

function ensureTable(table, hardReset){
  var t = parseTable(table);

  if(hardReset){
    var drop = 'DROP TABLE IF EXISTS '+ t.full+'; ';
    executeQuery(db, packageQuery(drop)).catch(function() {
      log.error('Failed to reset table.');
    });
  }

  var ensureSchema = 'CREATE SCHEMA IF NOT EXISTS '+ t.schema+';';
  executeQuery(db, packageQuery(ensureSchema), function() {
    var ensureTableQ = 'CREATE TABLE IF NOT EXISTS '+t.full+' ( data jsonb);';
    executeQuery(db, packageQuery(ensureTableQ)).catch(function() {
      log.error('Failed to create table.');
    });
  });
}

function upsert(table,data, where){
  var t = parseTable(table);

  var whereObjStr = toSafeJson(where);
  var dataObjStr = toSafeJson(data);

  var params = [dataObjStr];

  var insertQ = 'INSERT INTO '+ t.full +' (data) SELECT $1';
  var updateQ = 'UPDATE '+ t.full+' SET data = $1';
  if(whereObjStr){
    updateQ+=' WHERE data @> $2';
    params.push(whereObjStr);
  }

  var q = 'WITH upsert AS ('+updateQ+' RETURNING *) '+insertQ+
    ' WHERE NOT EXISTS (SELECT * FROM upsert); ';

  return packageQuery(q,params);
}

function remove(table,where){
  var t = parseTable(table);

  var q = 'DELETE FROM '+ t.full;
  if(where){
    q+=' WHERE data @> $1';
  }
  return packageQuery(q,where);

}

function select(table,where){
  var t = parseTable(table);

  var q = 'SELECT data FROM '+ t.full;
  var params = [];
  var whereObjStr = toSafeJson(where);
  if(whereObjStr){
    q+= ' WHERE data @> $1';
    params.push(whereObjStr);
  }
  return packageQuery(q,params);
}

// -------------------------------- //
// Result Processing Functions      //
// -------------------------------- //

function extractData(result){
  return _.map(result.rows,'data');
}

function extractRowCount(result){
  return result.rowCount||0;
}

// -------------------------------- //
// Query Handling Functions         //
// -------------------------------- //

function executeQuery(conn,query,thenFunc){
  log.debug('EXECUTING: '+query.query + ' :: '+JSON.stringify(query.params));
  var p = properPromise(conn.result(query.query, query.params));
  if(thenFunc){
    p=p.then(thenFunc);
  }
  return p;
}

function runQuery(queryBuilder, thenFunc){
  return function(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9){
    var q = queryBuilder(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9);
    return executeQuery(db,q,thenFunc);
  };
}

function saveQuery(queries, queryBuilder, thenFunc){
  return function(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9){
    var q = queryBuilder(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
    queries.push({
        query: q,
        thenFunc: thenFunc
      }
    );
  };
}

function multi(cb){
  var queries = [];

  var helper = {
    upsert: saveQuery(queries,upsert, extractRowCount),
    remove: saveQuery(queries, remove, extractRowCount)
  };

  cb(helper);
  var sco;
  return db.connect().then(function(obj){
    sco = obj;
    if(! sco){
      throw 'Unable to get shared connection!';
    }
  }).then(function(){
    return BPromise.map(queries, function(q){
      return executeQuery(sco, q.query, q.thenFunc);
    });
  }).then(function(result){
    if(sco){
      sco.done();
    }
    return result;
  });

}

module.exports = {
  upsert: runQuery(upsert,extractRowCount),
  remove: runQuery(remove,extractRowCount),
  ensureTable: ensureTable,
  select: runQuery(select, extractData),
  multi: multi
};
