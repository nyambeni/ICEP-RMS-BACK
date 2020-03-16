const con= require('../conn/conn');
const express = require('express');
router = express.Router();  
const multer= require('multer');
const path = require('path');


router.post('/upload5',upload.single('images'),(req,res)=>{
    let post={
	  email:req.body.email,
	  propery_name:req.body.propery_name,
	  propery_owner:req.body.propery_owner,
	  city:req.body.city,
	  postal_code:req.body.postal_code,
	  street_address:req.body.street_address,
	  images = req.images
            }
    if (images) {
		var myQuery = "INSERT INTO property SET ?";
                con.query(myQuery, [post], function(err, results){
				 	if (err) {
						res.send("property not added");  
					}
					else{
						return res.send({results,
						  message: " successful!!! -- property added"})
					}

				})
        // con.query("INSERT INTO property(images) VALUES ('"+ images + "')", [images], function(err,results){
        //     if (err) {
        //         res.send("upload document - failed.........file not received");  
        //     }
        //     else{
        //         return res.send({results,
        //           message: " successful!!! --file received"})
        //     }
        //     }) 
    } else {
        res.send("PLEASE UPLOAD YOUR DOCUMENT");
    } 
});

module.exports = router;