const { cloudinary } = require("../config/cloudinary");
const Book = require("../model/book.model")
const categories = require("../model/categories");
const user = require("../model/user");
const Cart = require("../model/cart");
const favorite = require("../model/Favorite");

const handleBookStore = async (req, res) => {
    try {
        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: "Image required" });
        }
        console.log("body :", req.body);
        console.log("File :", req.files);

        const file = req.files.image;
        const { bookname, bookTitle, bookAuthor, bookPrice, publishDate, bookCategory, stock, description } = req.body;
        if (!bookname || !bookTitle || !bookAuthor || !bookPrice || !publishDate)
            return res.status(400).json('All fields required')

        const result = await cloudinary.uploader.upload(
            file.tempFilePath,
            { folder: "book-store" }
        );
        console.log("secure url: ", result.secure_url);

        const book = await Book.create({
            bookname,
            bookTitle,
            bookAuthor,
            bookPrice,
            publishDate,
            bookCategory,
            stock,
            description,
            image: result.secure_url,

        })

        res.status(201).json({
            message: "Book added sucessfully ",
            data: book
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Error occurred",
            error: err.message
        });
    }
}
const getAllbooks = async (req, res) => {
    try {
        const books = await Book.find().populate("bookCategory", "name");

        res.status(200).json({
            message: "all book fetched !",
            data: books
        })


    }
    catch (err) {
        res.status(500).json({
            message: "Error occurred",
            error: err.message
        })
    }
}

const getbyid = async (req, res) => {

    try {
        const books = await Book.findById(req.params.id);

        if (!books) return res.status(404).json({
            message: "no record book found !",

        });

        res.status(200).json({
            message: "Book found",
            data: books
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Error occurred",
            error: err.message
        })
    }
}

const deleteBookbyId = async (req, res) => {
    try {

        const deleteBook = await Book.findByIdAndDelete(req.params.id);

        if (!deleteBook) {
            return res.status(404).json({
                message: "Book not found"
            })

        }
        res.status(200).json({
            message: "Book deleted successfully !",

        })
    }
    catch (err) {
        res.status(500).json({
            message: "Error occurred",
            error: err.message
        })
    }
}

const updateById = async (req, res) => {

    const { id } = req.params;

    const { bookname, bookTitle, bookAuthor, bookPrice, publishDate, stock, description } = req.body;
    if (!bookname || !bookTitle || !bookAuthor || !bookPrice || !publishDate)
        return res.status(400).json('All fields required')

    const book = await Book.findByIdAndUpdate(id, {
        bookname,
        bookTitle,
        bookAuthor,
        bookPrice,
        publishDate,
        stock,
        description
    }, { new: true });


    res.status(200).json({
        message: "Book updated !",
        data: book
    })
}
const save_category = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Category name is required"
            });
        }
        const newcategory = await categories.create({

        });
        res.status(201).json({
            message: "category added successfully ",
            data: newcategory
        })
    } catch (err) {
        res.status(500).json({
            message: "error occurred ",
            error: err.message
        })
    }
}


const getallCategory = async (req, res) => {

    try {
        const allcategory = await categories.find();


        if (!allcategory)
            return res.status(404).json("Categories not found")
        res.status(201).json(
            {
                message: "fetched success",
                data: allcategory
            })
    }
    catch (err) {
        res.status(500).json({
            message: "Error occured in category fetching ",
            error: err.message
        })
    }
}
const addtoCart = async (req, res) => {

    try {
       
        const{bookId,quantity}=req.body;
        let cart=await Cart.findOne({user:req.user.id});
        if(!cart){
            cart=new Cart({
                user:req.user.id,
                items:[]
            });
        }
         const existingItem = cart.items.find(
      item => item.book.toString() === bookId
    ); 

    if(existingItem){
     existingItem.quantity += quantity;
    }else{
     cart.items.push({
        user:req.user.id,
        book:bookId,
        quantity
     })
    }
      await cart.save();

    res.status(200).json({
      message: "Book added to cart!",
      data: cart
    });

    }
    catch (err) {
        res.status(500).json({
            message: "Error occurred in adding book to cart ",
            error: err.message
        })
    }
}
    const findbookById = async (req, res) => {
        try {
           
            const cartbook = await Cart.findOne({
                user: req.user.id,
                "items.book": req.params.id
            });
            if (!cartbook) return res.status(404).json({
                message: "Book not found in cart !"
            })
            res.status(200).json({
                message: "Book found in cart !",
                data: cartbook || null
            })
        }
        catch (err) {
            res.status(400).json({
                message: "Error occured",
                error: err.message
            })
        }
    }

const deleteBookFromCart=async(req,res)=>{
    try{
        const { id } = req.params; 
        const userId = req.user.id || req.user._id;
        
        const cart = await Cart.findOneAndUpdate(
            { user: userId },
            { $pull: { items: { _id: id } } },
            { new: true }
        ).populate("items.book");
        
        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }
        
        res.status(200).json({
            message: "Book deleted from cart successfully",
            data: cart
        });
    }
    catch(err){
        res.status(500).json({
            message: "Error deleting book from cart",
            error: err.message
        });
    }
}

const getallCarts=async(req,res)=>{
try{
    
   const userId=req.user.id || req.user._id;
    const carts=await Cart.find({user:userId})
    .populate("user")
    .populate("items.book");

    if(!carts || carts.length === 0){
        return res.status(404).json({
            message:"No carts found for this user !"
        })
    }
    res.status(200).json({
        message:"all carts fetched ",
        data:carts
    }) 

}
catch(err){
    res.status(500).json({
        message:"Error occurred while fetching carts",
        error:err.message
    })
}
}

const handleFavorite = async (req, res) => {
    try {
        const { bookId } = req.body;
        const userId=req.user.id || req.user._id;
        const bookExists = await Book.findById(bookId);
        if (!bookExists) {
            return res.status(404).json({
                message: "Book not found"
            });
        }
        const response=await favorite.findOneAndUpdate(
            { book: bookId, user: userId },
            { $set: { favorite: true } },
            { new: true, upsert: true }
        );
        res.status(200).json({  
            message: "Book marked as favorite",
            data: response
        });
    }   catch (err) {
        res.status(500).json({
            message: "Error occurred while marking book as favorite",
            error: err.message
        });
    }
}

const getAllFavoritebooks =async(req,res)=>{
    try{
  const userId=req.user.id || req.user._id;
  const favoriteBooks=await favorite.find({user:userId,favorite:true}).populate("book");
    res.status(200).json({
        message:"Favorite books fetched successfully",
        data:favoriteBooks
    })
    }
    catch(err){
        res.status(500).json({
            message: "Error occurred while fetching favorite books",
            error: err.message
        });



    }
}

const removeFromFavorite = async (req, res) => {
    try {
        const { id } = req.params; // Get bookId from URL params
        const userId = req.user.id || req.user._id;
        const response = await favorite.findOneAndDelete(
            { book: id, user: userId }
        );
        if (!response) {    
            return res.status(404).json({
                message: "Favorite entry not found"
            });
        }
        res.status(200).json({
            message: "Book removed from favorites",
            data: response
        });
    }
    catch (err) {   
        res.status(500).json({
            message: "Error occurred while removing book from favorites",
            error: err.message
        });
    }
}
    module.exports = { handleBookStore,getAllFavoritebooks, getAllbooks, getbyid, deleteBookbyId, updateById, getallCategory, save_category, addtoCart, findbookById,deleteBookFromCart ,getallCarts,handleFavorite,removeFromFavorite };


