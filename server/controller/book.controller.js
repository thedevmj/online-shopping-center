const Book = require("../model/book.model")

const handleBookStore = async (req, res) => {


    try {

        const { bookname, bookTitle, bookAuthor, bookPrice, publishDate } = req.body;
        if (!bookname || !bookTitle || !bookAuthor || !bookPrice || !publishDate)
            return res.status(400).json('All fields required')

        const book = await Book.create({
            bookname,
            bookTitle,
            bookAuthor,
            bookPrice,
            publishDate
        })

        res.status(201).json({
            message: "Book added sucessfully ",
            data: book
        })
    }
    catch (err) {
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
        req.status(500).json({
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

const updateById=async(req,res)=>{

    const {id}=req.params;

     const { bookname, bookTitle, bookAuthor, bookPrice, publishDate } = req.body;
        if (!bookname || !bookTitle || !bookAuthor || !bookPrice || !publishDate)
             return res.status(400).json('All fields required')
         
        const book=await Book.findByIdAndUpdate(id,{
            bookname,
            bookTitle,
            bookAuthor,
            bookPrice,
            publishDate
        },{new:true});

    
    res.status(200).json({
        message:"Book updated !",
       data:book
    })

    
   
}
module.exports = { handleBookStore, getAllbooks, getbyid, deleteBookbyId,updateById };

