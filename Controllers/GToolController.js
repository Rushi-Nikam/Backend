const GTools = require('../models/GToolsModel');
const GToolController = async(req,res)=>{
    const {title,image_url,description,category,rating,quantity,price} =req.body;
    try{ 
 
  const result = await GTools(title,image_url,description,category,rating,quantity,price);
      
    res.status(201).json({ 
            success: true, 
            message: 'Message sent successfully!',
            insertId: result.insertId 
        });

    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
}
module.exports = GToolController;