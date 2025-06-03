const express = require('express');
const router = express.Router();
const {registeruser,loginuser,getAllUsers,getUserById,updateUser,deleteuser,verifyUser} = require("../Controllers/userController");
const {authenticateJWT} = require("../Middleware/authMiddleware");


router.post("/register", registeruser);
router.post("/login", loginuser);
router.get("/verify", verifyUser); 
router.get("/", authenticateJWT, getAllUsers);
router.get("/:id", authenticateJWT, getUserById);
router.put("/:id", authenticateJWT, updateUser);
router.delete("/:id", authenticateJWT, deleteuser);
module.exports = router;
