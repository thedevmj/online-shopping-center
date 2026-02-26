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
    res.status(201).json({
        success: true,
        token,
        user: {
            id: user._id,
            email: user.email,
            password:user.password,
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

module.exports={addUser,loginUser}