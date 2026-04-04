const express=require("express")
const { addUser, loginUser,logoutuser } = require("../controller/usercontroller");
const router=express.Router();

router.post("/register",addUser);
router.post("/login",loginUser);
router.post("/logout",logoutuser);

module.exports=router;