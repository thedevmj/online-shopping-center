const jwt = require("jsonwebtoken");
const User = require("../model/user");


exports.verifyToken = (req, res, next) => {

  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.User = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
exports.isAdmin =(req,res,next)=>{
  
  if(req.User.role !== "Admin"){
    return res.status(403).json({
      message:"Not authorized !"
    })
  }
  
  next();
}

