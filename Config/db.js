
const mysql = require('mysql2');


const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Rushikesh@27",
    database:"Leafy",
    connectionLimit: 10
});


const connectDb = () =>{
 return  new Promise((resolve,reject)=>{
    pool.getConnection((err,connection)=>{
        if(err){
         console.error("Error connecting to the database",err.message);
         return reject(err);
        }else{

            console.log("successfully connected to the database");
            connection.release();
            resolve();
         }
    })
 })

    }

module.exports = {connectDb,pool};
