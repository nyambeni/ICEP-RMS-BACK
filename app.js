const mysql = require('mysql');
const express = require('express');
const app = express();
const con= require('./conn/conn');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,DELETE,PUT,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();    
  });
// api routes

 app.use('/', require('./routes/landlord'));
 app.use('/', require('./routes/student'));
 app.use('/', require('./routes/login'));
 app.use('/', require('./routes/admin'));

 // start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 5000;
const server = app.listen(port, function () {
                          console.log('Server listening on port ' + port);
                        });
