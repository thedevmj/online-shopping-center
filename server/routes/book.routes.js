const express=require("express");
const {handleBookStore, getbyid, deleteBookbyId, updateById, save_category, getallCategory} = require("../controller/book.controller");
const {getAllbooks} = require("../controller/book.controller");

const router=express.Router()

router.get("/getall",getAllbooks);
router.get("/getcategory",getallCategory);
router.post("/addbook",handleBookStore);
router.get("/:id",getbyid);
router.delete("/delete/:id",deleteBookbyId);
router.put("/update/:id",updateById);
router.post("/category",save_category);
module.exports=router;