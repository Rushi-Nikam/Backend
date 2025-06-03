const express = require('express');
const router = express.Router();
const {registeruser,loginuser,getAllUsers,getUserById,updateUser,deleteuser,verifyUser} = require("../Controllers/userController");
const {authenticateJWT} = require("../Middleware/authMiddleware");



// Verify email


router.post("/register", registeruser);
router.post("/login", loginuser);
router.get("/verify", authenticateJWT, verifyUser); // ✅ Token sent in header
router.get("/", authenticateJWT, getAllUsers);
router.get("/:id", authenticateJWT, getUserById);
router.put("/:id", authenticateJWT, updateUser);
router.delete("/:id", authenticateJWT, deleteuser);
module.exports = router;
