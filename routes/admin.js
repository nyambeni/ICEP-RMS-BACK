const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const  db = require('../conn/conn');
const bodyparser = require('body-parser')

//Get all student
router.get('/reg',(req,res)=>{
    db.query('SELECT * FROM admin',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
});

//Get a student
router.get('/reg/:id',(req,res)=>{
    db.query('SELECT * FROM admin WHERE id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
});

//Delete a student
router.delete('/reg/:id',(req,res)=>{
    db.query('DELETE FROM admin WHERE id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    })
    
});
//Delete a seller
router.delete('/delete/:id',(req,res)=>{
    db.query('DELETE FROM admin WHERE id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    })
    
});
//Insert a Admin
/*router.post('/reg',(req,res)=>{

    let adm = req.body;
    var sql =  "SET @id = ?;SET @First_name = ?;SET @Last_name = ?;SET @email = ?;SET @passwrd = ?;\
    CALL A(@id,@First_name,@Last_name,@email,@passwrd);";

    db.query(sql,[adm.id,adm.First_name,adm.Last_name,adm.email,adm.passwrd],(err,rows,fields)=>{
        if(!err)
            rows.forEach(element => {
                if(element.constructor ==Array)
                res.send('Inserted student id:'+element[0].adminId);
            });
        else
            console.log(err);
    })
    
});


//Udate a student
router.put('/reg',(req,res)=>{

    let adm = req.body;
    var sql = "SET @id = ?;SET @First_name = ?;SET @Last_name = ?;SET @email = ?;SET @passwrd = ?;\
    CALL A(@id,@First_name,@Last_name,@email,@passwrd);";

    db.query(sql,[adm.id,adm.First_name,adm.Last_name,adm.email,adm.passwrd],(err,rows,fields)=>{
        if(!err)
           res.send('Updated...');
        else
            console.log(err);
    })
    
});
*/
module.exports = router ;
