const {pool} = require('../Config/db');
const GTools = (title,image_url,description,category,rating,quantity,price)=>{
const sql = "INSERT INTO gardeningtools(title,image_url,description,category,rating,quantity,price)values(?,?,?,?,?,?,?)";
return new Promise((resolve,reject)=>{
pool.query(sql,[title,image_url,description,category,rating,quantity,price],(err,result)=>{
    if(err)return reject(err);
    return resolve(result);
}) 
})
}
module.exports = GTools;