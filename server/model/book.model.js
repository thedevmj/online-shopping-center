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
        
    },
    bookCategory:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"categories"
    }
    ,
    stock: {
     type:Number,
     default:1
    },
     image:{
    type:String 
    }
},
    {
        timestamps: true

    }
    
);
const Book=mongoose.model('books',bookSchema)
module.exports=Book;