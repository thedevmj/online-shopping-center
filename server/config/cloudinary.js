const cloudinary=require("cloudinary").v2;


cloudinary.config({
   cloud_name:'dnjlq7ule',
   api_key:'372677654413622',
   api_secret:'wdzkZEyt7YnMxEjtCCqudJCCZLA'

})
console.log(process.env.CLOUD_NAME);
console.log(process.env.CLOUD_API_KEY);
console.log(process.env.CLOUD_API_SECRET);


module.exports={cloudinary};