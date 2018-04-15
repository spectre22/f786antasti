var express = require('express');
var url = require('url');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); //extension of views
app.use(bodyParser.urlencoded({ extended: false }));
var fs = require('fs');
var ejs = require('ejs');
var bcrypt = require('bcrypt');
//var popup = require('popups');
//var fileUpload = require('express-fileupload');
app.use(express.static(__dirname + '/public'));
//app.use(fileUpload());
var session = require('express-session');
app.use(session({
			secret:'2C44-4D44-WppQ38S',
			resave:true,
			saveUninitialized:true
			}));

//mysql 
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 100, //focus it
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'voter'
    
    
});
var pool_voter      =    mysql.createPool({
  connectionLimit : 100, 
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database:'poll',
  debug    :  false
});
app.get('/', function (req, res) {
    //res.render('login_voter');
  //res.send('Users home page');
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
 
});
app.get('/about', function (req, res) {
  //res.render('login_voter');
//res.send('Users home page');
fs.readFile('about.html', function(err, data) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(data);
  res.end();
});
});
app.get('/voting', function (req, res) {
  //res.render('login_voter');
//res.send('Users home page');
fs.readFile('voting.html', function(err, data) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(data);
  res.end();
});
});
app.get('/success', function (req, res) {
  //res.render('login_voter');
//res.send('Users home page');
fs.readFile('success.xml', function(err, data) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(data);
  res.end();
});
});
app.get('/contact', function (req, res) {
  //res.render('login_voter');
//res.send('Users home page');
fs.readFile('contact.html', function(err, data) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(data);
  res.end();
});

});
app.get('/news', function (req, res) {
  //res.render('login_voter');
//res.send('Users home page');
fs.readFile('news.html', function(err, data) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(data);
  res.end();
});

});
app.get('/register', function (req, res) {
  fs.readFile('register.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
      res.end();
    });
  });
    app.post('/login',function(req,res)
    {
        var email= req.body.email;
        var password = req.body.password;
        console.log(email);
        console.log(password);
        pool.query('SELECT * FROM user WHERE email = ?',[email], function (error, results, fields) {
        if (error) throw error; 
        else{
           
          if(results.length >0){
            bcrypt.compare(password, results[0].password, function(err, doesMatch){
            if(doesMatch){
             
                  res.redirect('/voting');
            }
            else{
              res.send({
                "code":204,
                "failed":"Email and password does not match"
                  });
            }
          });
          }
          else{
            res.send({
              "code":204,
              "failed":"Email does not exits"
                });
                
          }
        }
        });
    });
    app.post('/register',function(req,res)
    {
        console.log("req",req.body);
        bcrypt.hash(req.body.password, 10, function( err, bcryptedPassword) {
          
        var user={
          "name":req.body.name,
          "state":req.body.state,
          "email":req.body.email,
          "password":bcryptedPassword,
          "mobile":req.body.mobile,
          "dob":req.body.dob,
          "sex":req.body.sex,
          "pin":req.body.pin,
          "adda":req.body.adda,
          "aadhar":req.body.aadhar,
         }
        
        pool.query('INSERT INTO user SET ?',user, function (error, results, fields) {
        if (error) {
          console.log("error ocurred",error);
          res.send({
            "code":400,
            "failed":"error ocurred"
          });
        }
        else{
          
          res.redirect("/");
          
          
         
        }

        });
      
      
    });
  });
    app.post('/voting',function(req,res)
    {
        
         
     
        
       
        
        
        var voters={
         
          "party":req.body.party,
          "ccy":req.body.ccy,
          "aadhar":req.body.aadhar,

         
        }
    
        pool_voter.query('INSERT INTO voters SET ?',voters, function (error, results, fields) {
        if (error) {
          console.log("error ocurred",error);
          res.send({
            "code":400,
            "failed":"error ocurred"
          })
        }
        else{
        
         
          
          //console.log('The solution is: ', results);
         res.redirect('/success');
        }
        });
      
    });
   

    app.listen(8000);