const express=require("express")
const { addUser, loginUser,logoutuser, checkAuth } = require("../controller/usercontroller");
const router=express.Router();

router.post("/register",addUser);
router.post("/login",loginUser);
router.post("/logout",logoutuser);
router.get("/me",checkAuth);
module.exports=router;