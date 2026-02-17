const mongoose=require("mongoose")

const category_list= new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true,
    }
})
const categories=mongoose.model("categories",category_list);
module.exports=categories;