const express=require("express");
const {handleBookStore, getbyid, deleteBookbyId, updateById, save_category, getallCategory, addUser, loginUser} = require("../controller/book.controller");
const {getAllbooks} = require("../controller/book.controller");
const { isAdmin, verifyToken } = require("../middleware/authmiddleware");


const router=express.Router()

router.get("/getall",getAllbooks);
router.get("/getcategories",getallCategory);
router.post("/addbook",verifyToken,isAdmin,handleBookStore);
router.get("/:id",verifyToken,isAdmin,getbyid);
router.delete("/delete/:id",verifyToken,isAdmin,deleteBookbyId);
router.put("/update/:id",verifyToken,isAdmin,updateById);
router.post("/category",verifyToken,isAdmin,save_category);
module.exports=router;