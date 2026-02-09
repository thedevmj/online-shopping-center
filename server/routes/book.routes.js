const express=require("express");
const {handleBookStore, getbyid, deleteBookbyId, updateById} = require("../controller/book.controller");
const {getAllbooks} = require("../controller/book.controller");

const router=express.Router()

router.get("/getall",getAllbooks);
router.post("/addbook",handleBookStore);
router.get("/:id",getbyid);
router.delete("/delete/:id",deleteBookbyId);
router.put("/update/:id",updateById);
module.exports=router;