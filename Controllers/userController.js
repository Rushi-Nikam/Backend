require('dotenv').config();
const userModel  = require("../models/userModels");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const registeruser = async(req,res)=>{

    try{
        const {name,mobile_number,email,password}=req.body;
        const userId= await userModel.Registeruser(name,mobile_number,email,password);
         return  res.status(201).json({message:'User registerd',userId});

    }catch(error){
        return res.status(500).json({error:error.message})
    }
};

const verifyUser =  (req, res) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Authorization header missing or invalid' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        return res.status(200).json({ success: true, user: decoded });
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
};

module.exports = verifyUser;

const loginuser = async(req,res)=>{
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await userModel.findUserByEmail(email);

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare provided password with hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token           
        const token = jwt.sign({ userId: user.user_id,email:user.email,name:user.name}, JWT_SECRET, { expiresIn: '2m' });

       return res.json({ success: true, token });
    } catch (error) {
        console.error(error);
       return res.status(500).json({ message: 'Server error' });
    }
}
//Get all users
const getAllUsers = async(req,res)=>{
    try{
        const user = await userModel.getAllUsers();
        return res.status(200).json(user);

    }
    catch(error){
        res.status(500).json({error:error.message});
    }
};
// Get a user by ID
const getUserById = async(req,res)=>{
    try{
        const userId = req.params.id;
        const user = await userModel.findUserById(userId);
        if(!user){
            return res.status(404).json({message:"user not found"});
        }
       return  res.status(201).json(user);
    }catch(error){
        return res.status(501).json({error:error.message})
    }
}
//update User 
const updateUser = async(req,res)=>{
    try {
        const userId = req.params.id;
        const {name,mobile_number,email,password}= req.body;
        const affectedRows = await userModel.updateuser(userId,name,mobile_number,email,password);
        
        if(affectedRows === 0){
            return res.status(404).json({message:"user not found"})
        }
        return res.status(201).json({message:"updated successfully"});

    } catch (error) {
       return  res.status(500).json({ error: error.message });
    }

}
//delete user
const deleteuser  = async(req,res)=>{
    try {
        const userId = req.params.id;
        const affectedRows = await userModel.deleteuser(userId);
        if(affectedRows === 0){
           return res.status(404).json({message:"user not found"})
        }
        return res.status(201).json({message:"deleted successfully"});

    } catch (error) {
     
        return  res.status(500).json({ error: error.message });   
    }
}
module.exports = {
    registeruser,
    loginuser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteuser,
    verifyUser
}