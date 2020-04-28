const con= require('../conn/conn');
const express = require('express');
router = express.Router(); 



router.post('/landlordreg',(req,res)=>{
 
    if(req.body.password!=req.body.password_confirm){
        res.send("passwords do not match")
    }else{
        var email = req.body.email_address;
        var sql = "SELECT * FROM landlord WHERE email_address = ?";
        con.query(sql,[email],function(err,results){
         if(results.length > 0){
    
                res.send({
                    message : "Sorry this landlord already exist!"
                })
    
            }else{
                let lordData={
                    email_address: req.body.email_address,
                    password : req.body.password
                }

                var sql = "INSERT INTO landlord SET ?";
                con.query(sql,[lordData],function(err,results){

                    if(err)throw err
                    else{
                        res.send({
                                    data:results,
                                    message:"Successfully registered"
                        });
                    }

})
   }
      })
    }
    
});

//update profile

router.put('/updateLandlord', (req,res)=>{
    let lordData ={ 
        company_name:req.body.company_name,
        registration_no:req.body.registration_no,
       house_number:req.body.house_number,
       street_name:req.body.street_name,
       suburb:req.body.suburb,
       city:req.body.city,
       zip_code:req.body.zip_code,
       province:req.body.province,
       country:req.body.country,
        telephone:req.body.telephone 
       }
  let email = req.body.email_address;
       
    con.query('UPDATE landlord SET ? where email_address = "'+email+'"',[lordData],function (error, results, fields)
    {
        if (error) throw error;
        else
        {
          con.query('select * from landlord where email_address = "'+email+'"',[lordData],function (error, results, fields){
          return res.send({results})
      })
    }       
      })
    })

    
module.exports =router;
