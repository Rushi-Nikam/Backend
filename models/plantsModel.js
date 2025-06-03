const { pool } = require("../Config/db");
const Plants = (title,scientific_name,image_url,description,category,rating,quantity,price)=>{
const sql = "Insert into plants (title,scientific_name,image_url,description,category,rating,quantity,price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
return new Promise((resolve,reject)=>{
    pool.query(sql,[title,scientific_name,image_url,description,category,rating,quantity,price],(err,result)=>{
        if(err) return reject(err);
        
        return resolve(result);
    })
})
}
module.exports = Plants;


