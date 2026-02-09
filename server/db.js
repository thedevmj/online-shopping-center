const mongoose=require("mongoose")
const databaseConnection= async()=>{

    
    mongoose
    .connect("mongodb://localhost:27017/bookStore")
    .then(()=>{
        console.log("database connected successfully !");
        
    })
    .catch((err)=>{
        console.log("error failed to connect !",err);
        
    })

}

module.exports= databaseConnection;

