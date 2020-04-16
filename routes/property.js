const con= require('../conn/conn');
const express = require('express');
router = express.Router();
const multer= require('multer');
const path = require('path');

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  var upload = multer({ storage: storage })
 


router.post('/addproperty',upload.single('reg_proof'),(req,res,next)=>{

    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file)
})

//search by campus name
router.get('/searchProperty',function(req,res){

  let campus =req.body.city

  datb.query('SELECT city from property where city = "'+city+'"',function(error, results, fields) {
      if(error) throw error;
      else
      {    
          return res.send({"the results are ":results})
      }
       
  }); 

})

module.exports = router;
