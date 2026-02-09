const mongoose = require("mongoose")
const bookSchema = new mongoose.Schema({
    bookname: {
        type: String,
       
    },
    bookTitle: {
        type: String,
       
    },
    bookAuthor: {
        type: String,
       
    },
    bookPrice: {
        type: String,
        
    },
    publishDate: {
        type: String,
        
    }
},
    {
        timestamps: true

    }
    
);
const Book=mongoose.model('books',bookSchema)
module.exports=Book;