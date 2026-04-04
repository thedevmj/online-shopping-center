const User=require("../model/user");


const addUser = async (req, res) => {
    
  try{
    const {email, password} = req.body
 
    
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({
            message: "User already exists "
        })

    }
    const user = await User.create({
        email,
        password,
       

    });
    const token = user.getSignedJwtToken();

    res.cookie("authToken", token, {
        httpOnly: true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict",
        maxAge:7*24*60*60*1000 
    });

    res.status(201).json({
        success: true,
        token,
        user: {
            id: user._id,
            email: user.email,
            role: user.role,
        },
    })
  }
 catch (error) {
  console.log("error ",error);
  
}
}
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

  
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

   
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

   
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = user.getSignedJwtToken();

    res.cookie("authToken",token,{
      httpOnly:true,
      secure:process.env.NODE_ENV === "production",
      sameSite:"strict",
      maxAge:7*24*60*60*1000
    });
    res.status(200).json({
      success: true,
      token,
      user:{
        _id: user._id,
        email: user.email,
        role: user.role,
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logoutuser=async(req,res)=>{
try{

  res.clearCookie("authToken");
  res.status(200).json({
    success:true,
    message:"Logged out successfully"
  })

}
catch(error){
  res.status(500).json({ message: error.message });
}
}
const checkAuth=(req,res)=>{
  res.status(200).json({
    success:true,
    user:{
      _id: req.User._id,
      email: req.User.email,
      role: req.User.role
    }

  });
}
module.exports={addUser,loginUser,logoutuser,checkAuth}