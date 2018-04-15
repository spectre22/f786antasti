var mysql = require('mysql');

var pool      =    mysql.createPool({
    connectionLimit : 100, 
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database:'voter',
    debug    :  false
});

  
pool.getConnection(function(err) {
  if (err) throw err;
  console.log("Connected1!");
  var sql = "Select * from user";
  pool.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    console.log("1 record inserted");
  });
});

module.exports=pool;