const con= require('../conn/conn');
const express = require('express');
router = express.Router();  
var bcrypt = require('bcrypt-nodejs');

// register student account
router.post('/studreg', function(req, res){  

    let post = {
        "student_no": req.body.student_no,
        "password": bcrypt.hashSync(password, null, null)
    };
    var  password = req.body.password
    var  confirm_password = req.body.confirm_password

    if(password != confirm_password){

        res.send({"message":"confirm password is not matched"})

    }

    var student_no = req.body. student_no;
    var myQuery1 = "SELECT * FROM student WHERE student_no = ?";
    con.query(myQuery1,[student_no],function(err,results){
        
        if(results.length > 0){

            res.send({
                data : results,
                code : 200,
                message : "Sorry, user already exist!"

            })

        }else{
                var myQuery = "INSERT INTO student SET ?";
                con.query(myQuery, [post,confirm_password], function(err, results){
                    if(err)throw err
                        
                        
                            
                    else{
                        
                        console.log("results")
                        res.send({
                            data : results,
                            message : "Registered Successfully..."
            
                        })
                    }
            })
        }
        
    })
});

// update student Contacts
router.put('/updateContact', (req,res)=>{
    let stud ={ 
        contact_student:req.body.contact_student,
        student_email:req.body.student_email,
        guardian_FullName:req.body.guardian_FullName,
        guardian_lastName:req.body.guardian_lastName,
        contact_guardian:req.body.contact_guardian,      
       }
  let student_no = (req.body.student_no)
       
    con.query('UPDATE student SET ? where student_no = "'+student_no+'"',[stud],function (error, results, fields)
    {
        if (error) throw error;
        else
        {
          con.query('select * from student where student_no = "'+student_no+'"',[stud],function (error, results, fields){
          return res.send({results})
      })
    }       
      })
    });

    // update Medical Details
    router.put('/updateMedicalAid', (req,res)=>{
        let stud ={ 
            medicalAid_no:req.body.medicalAid_no,
            medicalAid_plan:req.body.medicalAid_plan,
            mainMember_title:req.body.title,
            mainMember_FullNames:req.body.mainMember_FullNames,
            mainMember_lastName:req.body.mainMember_lastName,
            mainID_no:req.body.mainID_no,
            relationship:req.body.relationship
               
           }
      let student_no = (req.body.student_no)
           
        con.query('UPDATE student SET ? where student_no = "'+student_no+'"',[stud],function (error, results, fields)
        {
            if (error) throw error;
            else
            {
              con.query('select * from student where student_no = "'+student_no+'"',[stud],function (error, results, fields){
              return res.send({results})
          })
        }       
          })
        })
    

// update course
    router.put('/updateCourse', (req,res)=>{
        let stud ={ 
            campus_study:req.body.campus_study,
            faculty:req.body.faculty,
            course:req.body.course,
            year_of_admission:req.body.year_of_admission,
            sponsor:req.body.sponsor
               
           }
      let student_no = (req.body.student_no)
           
        con.query('UPDATE student SET ? where student_no = "'+student_no+'"',[stud],function (error, results, fields)
        {
            if (error) throw error;
            else
            {
              con.query('select * from student where student_no = "'+student_no+'"',[stud],function (error, results, fields){
              return res.send({results})
          })
        }       
          })
        })
    



    // view all students
    router.get('/viewStudent', (req,res)=>{


        con.query('SELECT * FROM  student ',function(error,results,fields){
      
            if(error)
            {
                res.send({"failed":"error occurred"})
            }
            else{
                       return res.send({data:results})
                }
      
        });
      });

      //view a specific student
      router.get('/aStudent',(req, res) => {

        let student_no ={student_no:req.body.student_no}
     
       con.query('SELECT * FROM student WHERE  student_no = ?',[student_no], (error, results,fields) => {
           if(error) throw error;
           res.send({data:results});
       });
    });


    //view a student room in a property

    router.get('/aRoom',(req, res) => {

        let student_no ={student_no:req.body.student_no}
     
       con.query('SELECT * FROM property WHERE  student_no = ?',[student_no], (error, results,fields) => {
           if(error) throw error;
           res.send({data:results});
       });
    });









    // const storage = multer.diskStorage({

    //     destination: function(req,file,cb){
    //      cb(null,"./upload");
    //        },
    //        filename: function(req,file,cb){
    //        cb(null,file.originalname);  
    //      }
     
    //  });
    //  const upload = multer({storage:storage});
     
     
    //   router.post('resapply',(req,res)=>{
    //   var status = "pending";
    //      let appData = {
         
    //          studentNum: req.body.studentNum,
    //          isDisable: req.body.isDisable,
    //          roomType: req.body.studentNum,
    //          resName: req.body.resName,
    //          status:status
    //      }; 
     
    //  var sql = "INSERT INTO resapplication SET ?";
    //  con.query(sql,[appData],function(err,results){
     
    //      if(err)throw err
    //      else{
    //          res.send('Application Sent');
    //      }
    //  })
     
    //  })
     
    //  // to upload proof of registration and reserve room
    //  router.post('/uploadReg',upload.single('reg_proof'),(req,res)=>{
    //      reg_proof= req.file.path;
    //      con.query("INSERT INTO reg(reg_proof) VALUES (?)",[reg_proof],function(err,result){
    //       if(err) throw err;
          
    //       else
    //       {
    //           return res.send({result});
    //       }
    //      })
    //  });
      
     
    //  // change application status to reserved
     
    //  router.put('/reserve',(req,res)=>{
    //      let email = (req.body.email)
    //      con.query('UPDATE resapplication SET status = reserved where email = "'+email+'"',(error,results,fields)=>{
    //          if(error)throw error
    //          else
    //          {
    //              res.send({results});
    //          }
    //      })
    //  });

module.exports = router;
 

