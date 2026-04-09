const express=require("express")
const { addUser, loginUser,logoutuser, checkAuth, getuserDetails } = require("../controller/usercontroller");
const { verifyToken } = require("../middleware/authmiddleware");
const router=express.Router();

router.post("/register",addUser);
router.post("/login",loginUser);
router.post("/logout",verifyToken,logoutuser);
router.get("/me",checkAuth);
router.get("/getuserdetails",getuserDetails);
module.exports=router;