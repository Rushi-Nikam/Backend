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
const verifyUser = async (req, res) => {
    const { email } = req.user;

    const sql = 'UPDATE users SET is_verified = true WHERE email = ?';
    pool.query(sql, [email], (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        return res.status(200).json({ success: true, message: 'Email verified successfully!' });
    });
};




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
        const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: '1h' });

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