const order = require("../model/order");
const User = require("../model/user");


const addUser = async (req, res) => {

  try {
    const { email, password } = req.body


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
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
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
    console.log("error occured in adding user ", error);

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

    user.status = "active";
    await user.save();

    const token = user.getSignedJwtToken();

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logoutuser = async (req, res) => {
  try {


    const updateduser = await User.findByIdAndUpdate(req.user.id, { status: "inactive" }, { new: true })
    res.clearCookie("authToken");
    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    })

  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const checkAuth = async (req, res) => {

  try {
    res.status(200).json({
      success: true,
      user: {
        _id: req.User._id,
        email: req.User.email,
        role: req.User.role
      }
    });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }


}

const getuserDetails = async (req, res) => {
  try {

    const user = await User.find();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found"
      })
    }

    res.status(200).json({
      success: true,
      data: user
    })

  }
  catch (err) {
    console.log("error occurred while fetching user details ", err);
  }
}
//for admin
const viewOrders=async(req,res)=>{

  try{

   const data= await order.find().populate("user","email");
   
   if(data.length === 0){
    return res.status(404).json({success:false,message:" Order not fetched"})
  }
  res.status(200).json({
    sucess:true,
    message:"Order fetch success ",
    data:data
  })
}
  catch(err){
  console.log("Error occurred in fetching order ",err);
  
  }

}
const manageOrders = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User not found "
      });
    }
    const { items, paymentId } = req.body.orderData || req.body;
    
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ message: "Invalid items" });
    }
    const ifexist= order.findOne(items._id);
    if (ifexist){
      return res.status(403).json({
        message :"Already ordered "
      })
    }
    if (!req.body) {
      return res.status(400).json({ message: "Request body missing" });
    }
   const totalAmount = items.reduce((acc, item) => {
      return acc + Number(item.priceAtPurchase) * item.quantity;
    }, 0);

    const success = order.create({
      user: userId,
      items,
      totalAmount,
      paymentId,
      paymentStatus: "completed"
    });
    if(success){
    res.status(200).json({
      message: "Order successfull"
    })
  }
  }
  catch (err) {
    console.log("error occurred while saving user Order ", err);
  }

}

const changeOrderStatus=async(req,res)=>{
  try{
    const orderId=req.params.id;
    const{status}=req.body;
    const response=await order.findByIdAndUpdate(orderId,
      {orderStatus:status},
    {new:true});

   if(!response){
    return res.status(404).json({
      message:"Order not found for the user"
    })
   }
    res.status(200).json({
      message:"Order Updated !"
    })

  }
  catch(err){
  console.log("Error changing Order status ",err);
  
  }
}
module.exports = { addUser, loginUser, logoutuser, checkAuth, getuserDetails, manageOrders,viewOrders ,changeOrderStatus}