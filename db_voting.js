var mysql = require('mysql');

var pool_voter      =    mysql.createPool({
    connectionLimit : 100, 
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database:'poll',
    debug    :  false
});

  
  pool_voter.getConnection(function(err) {
    if (err) throw err;
    console.log("Connected1!");
    var sql = "Select * from voters";
    pool_voter.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      console.log("1 record inserted");
    });
  });
