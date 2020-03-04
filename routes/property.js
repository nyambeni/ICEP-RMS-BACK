const con= require('../conn/conn');
const express = require('express');
router = express.Router();
const multer= require('multer');
const path = require('path');

// SET STORAGE
const storage = multer.diskStorage({
  destination: function(req,file,cb){
      cb(null, "./upload");
  },
          filename: function(req,file,cb){
          cb(null,file.originalname);
  }
});

const upload = multer({storage:storage});

 


router.post('/upload7',upload.single('reg_proof'),(req,res)=>{
    
  reg_proof = req.file.path;

  if (reg_proof) {
      con.query("INSERT INTO reg(reg_proof) VALUES ('"+ reg_proof + "')", [reg_proof], function(err,results){
          if (err) {
              res.send("upload document - failed.........file not received");  
          }
          else{
              return res.send({results,
                message: "document upload - successful!!! --file received"})
          }
          }) 
  } else {
      res.send("PLEASE UPLOAD YOUR DOCUMENT");
  } 
});
module.exports = router ;

