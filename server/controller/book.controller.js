const { cloudinary } = require("../config/cloudinary");
const Book = require("../model/book.model")
const categories=require("../model/categories")

const handleBookStore = async (req, res) => {
    
    try {
        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: "Image required" });
        }
        console.log("body :", req.body);
        console.log("File :", req.files);

        const file = req.files.image;
        const { bookname, bookTitle, bookAuthor, bookPrice, publishDate, stock } = req.body;
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
            stock,
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
        const books = await Book.find();

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

    const { bookname, bookTitle, bookAuthor, bookPrice, publishDate, stock } = req.body;
    if (!bookname || !bookTitle || !bookAuthor || !bookPrice || !publishDate)
        return res.status(400).json('All fields required')

    const book = await Book.findByIdAndUpdate(id, {
        bookname,
        bookTitle,
        bookAuthor,
        bookPrice,
        publishDate,
        stock
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
        const newcategory = req.params.categories;
        res.status(201).json({
            message: "Book added sucessfully ",
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
                data:allcategory
            })
    }
    catch (err) {
        res.status(500).json({
            message: "Error occured in category fetching ",
            error: err.message
        })
    }
}
module.exports = { handleBookStore, getAllbooks, getbyid, deleteBookbyId, updateById, getallCategory, save_category };

