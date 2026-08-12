const express=require("express");
const {handleBookStore, getbyid, deleteBookbyId, updateById, save_category, getallCategory, addtoCart, findbookById, deleteBookFromCart, getallCarts, handleFavorite, getAllFavoritebooks, removeFromFavorite} = require("../controller/book.controller");
const {getAllbooks} = require("../controller/book.controller");
const { isAdmin, verifyToken } = require("../middleware/authMiddleware");


const router=express.Router()

router.get("/getall",getAllbooks);
router.get("/getcategories",getallCategory);
router.get("/favoritebooks",verifyToken,getAllFavoritebooks);
router.get("/getallcarts",verifyToken,getallCarts);
router.get("/findbook/:id",verifyToken,findbookById);
router.get("/:id",verifyToken,isAdmin,getbyid);
router.delete("/delete/:id",verifyToken,isAdmin,deleteBookbyId);
router.delete("/deletecart/:id",verifyToken,deleteBookFromCart);
router.delete("/removefromfavorite/:id",verifyToken,removeFromFavorite);
router.put("/favorite/:id",verifyToken,handleFavorite);
router.put("/update/:id",verifyToken,isAdmin,updateById);
router.post("/category",verifyToken,isAdmin,save_category);
router.post("/addtocart",verifyToken,addtoCart);
router.post("/addbook",verifyToken,isAdmin,handleBookStore);

module.exports=router;