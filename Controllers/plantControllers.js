const Plants = require('../models/plantsModel');
const {pool} = require('../Config/db')
const handlePlants = async(req,res)=>{    
const {title,scientific_name,image_url,description,category,rating,quantity,price}=req.body;
try{
    const result = await Plants(title,scientific_name,image_url,description,category,rating,quantity,price);
   
     res.status(201).json({ 
            success: true, 
            message: 'Message sent successfully!',
            insertId: result.insertId 
        });
}catch(err){
 res.status(500).json({ success: false, message: err.message });
}
}
const getAllPlants = async(req,res)=>{
try{
    const sql = "select * from plants";
    const [rows] = await pool.promise().query(sql);
    res.status(201).json({success:true,Plants:rows});
    
}catch(err){
    res.status(500).json({success:false,message:err.message});
}
}
const getPlantByid = async(req,res)=>{
    const {id} = req.params;
    try{
     const sql = 'select * from plants where id = ?';
     const [rows]=await pool.promise().query(sql,[id])
     res.status(201).json({ success: true, plant: rows[0] });

    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
}
const getplantByTitle = async(req,res)=>{
    const {title}= req.query;
    try{
      const sql = "SELECT * FROM plants WHERE title LIKE ?";
const [rows] = await pool.promise().query(sql, [`%${title}%`]);
      
      if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Plant not found' });
    }
      res.status(201).json({success:true,plant:rows[0]});

    }catch(err){
   res.status(500).json({success:false,message:err.message});
    }
}
module.exports = {handlePlants,getAllPlants,getplantByTitle,getPlantByid};


