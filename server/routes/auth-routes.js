const express=require("express")
const { addUser, loginUser,logoutuser, checkAuth, getuserDetails, manageOrders, viewOrders, changeOrderStatus, getOrderByid } = require("../controller/usercontroller");
const { verifyToken } = require("../middleware/authMiddleware");
const router=express.Router();

router.post("/register",addUser);
router.post("/login",loginUser);
router.post("/logout",verifyToken,logoutuser);
router.post("/userorder",verifyToken,manageOrders);
router.get("/me",checkAuth);
router.get("/getuserdetails",getuserDetails);
router.get("/orderbyid",verifyToken,getOrderByid);
router.get("/getuserorder",viewOrders);
router.put("/:id",changeOrderStatus);

module.exports=router;