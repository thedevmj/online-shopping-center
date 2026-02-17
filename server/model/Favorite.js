const mongoose=require("mongoose")

const myfavorite =new mongoose.Schema({

    book:{
        type:mongoose.Schema.ObjectId,
        ref:"books"
    },
    favorite:{
        type:Boolean,
        default:false
    }
})
const favorite =mongoose.model("favBook",myfavorite);
module.exports=favorite; 