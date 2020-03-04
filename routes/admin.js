const mysql = require('mysql');
const express = require('express');
const app = express();
const con= require('../conn/conn');
const router = express.Router();


//insert data into admin table
router.post('/admin', function(req, res){

    let post = {
        id:req.body.id,
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        password:req.body.password
    };



    let email = req.body.email;
    let myQuery1 = "SELECT * FROM admin WHERE email = ?";
    con.query(myQuery1,[email],function(err,results){

        if(results.length > 0){

            res.send({
                data : results,
                code : 200,
                message : "Sorry, the email is alrady registered!"

            })

        }else{
                let myQuery = "INSERT INTO admin SET ?";
                con.query(myQuery, [post], function(err, results){
                    if(err){

                        res.send({
                            data : err,
                            code : 400,
                            message : "The was an error !!!"
                        });

                    }else{

                        console.log("results");
                        res.send({
                            data : results,
                            code : 200,
                            message : "Registered Successfully..."

                        })
                    }
            })
        }
    })
});
//retrieve data all admin data
router.get("/admin", (req, res)=>{
    con.query("SELECT * FROM admin",(err,rows,fields)=>{
        if(err)
        console.log(err);
        else
        res.send(rows);
    })

})

//insert applicant data in DB
router.post("/applicant",(req,res)=>{

    let postApp = {

        student_no:req.body.student_no,
        id_num:req.body.id_num,
        lname:req.body.lname,
        fname:req.body.fname,
        status:req.body.status
    }
 let appQuery = "INSERT INTO applicant SET ?";
 con.query(appQuery, [postApp], function(err,results){
     if(err)
     res.send({
         data: err,
         code : 14,
         message : "The was an error !!!"

     })
     else
     res.send({

        data: err,
        code :53,
        message : "Successfully applied for resident"
     })


 })
});

  //view all applicants

router.get("/applicant", (req,res)=>{
  con.query("SELECT * FROM applicant", (err,rows,feilds)=>{
  if(err)
    console.log(err);

    else
      res.send(rows);
  })

});

//get student infor by student_no

router.get("/applicant/:student_no",(req,res)=>{

let stud = req.params.student_no;
let query = "SELECT * FROM applicant WHERE student_no = ?";

  con.query(query,[stud], function(err,results){
    if(err)
      console.log(err);
    else
      res.send(results);
  })
});
//get applicant by status
router.get("applica/:status",(req,res)=>{
let stud = req.params.status;
let query = "SELECT * FROM applicant WHERE status = ?";

  con.query(query,[stud],function(err,results){
  if(err)
    console.log(err);
    else
      res.send(results);
  })
});

//update student status

router.put("/applicant/:student_no", (req,res)=>{

let stud = req.params.student_no;
let query = "UPDATE applicant SET status = ? WHERE student_no = ?";

con.query(query,[stud], function(err,rows,fields){
    if(err)
    res.send({
      message: "error updating data!"
    });

     else
       res.send({
       message: "updated"
       });
     //console.log(r);
   })

 // res.send(rows);

});

router.delete("/applicant/:student_no",(req,res)=>{

con.query("DELETE FROM applicant WHERE student_no = ?", req.params.student_no,function(err,rows){
  if(err)
    console.log(err);
  else
    res.send({
      message:"succesfully deleted"});
})

});

module.exports = router;