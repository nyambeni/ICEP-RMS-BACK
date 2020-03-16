const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,DELETE,PUT,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();    
  });


  const ONE_HOUR = 1000 * 60 * 60;
  const{
   SESS_NAME = 'rms',
   SESS_SECRET = '1234',
   SESS_LIFETIME = ONE_HOUR,
   secu=false
}=process.env

app.use(session({
  name:SESS_NAME,
  resave:false,
  saveUninitialized:false,
  secret:SESS_SECRET,
  cookie:{
      maxAge:SESS_LIFETIME,
      sameSite:true,
      secure:true
  }

}))

app.get('/',(req,res)=>{
 
  
  console.log(req.session.userID);


})
   //const redirectLogin =(req,res,next)
// api routes/

 app.use('/', require('./routes/landlord'));
 app.use('/', require('./routes/student'));
 app.use('/', require('./routes/login'));
 app.use('/', require('./routes/admin'));
 app.use('/', require('./routes/resapplication'));

 // start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 7000;
const server = app.listen(port, function () {
                          console.log('Server listening on port ' + port);
                             });
