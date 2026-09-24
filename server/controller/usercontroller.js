const order = require("../model/order");
const User = require("../model/user");


const addUser = async (req, res) => {

  try {
    const { email, password } = req.body

    if(!email || !password){
      return res.status(400).json({
        message: "Please provide email and password"
      })
    }
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
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
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
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
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
const viewOrders = async (req, res) => {

  try {

    const data = await order.find().populate("user", "email");

    res.status(200).json({
      success: true,
      message: "Order fetch success ",
      data: data
    })
  }
  catch (err) {
    console.log("Error occurred in fetching order ", err);

  }

}
const manageOrders = async (req, res) => {
  try {
    if (req.user?.role === "Admin") {
      return res.status(403).json({ success: false, message: "Admins cannot place orders" });
    }

    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const { items, paymentId } = req.body.orderData || req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Invalid items" });
    }

    const totalAmount = items.reduce((acc, item) => {
      return acc + Number(item.priceAtPurchase) * item.quantity;
    }, 0);

    const newOrder = await order.create({
      user: userId,
      items,
      totalAmount,
      paymentId,
      paymentStatus: "completed"
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: newOrder
    });

  } catch (err) {
    console.log("error occurred while saving user Order", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const changeOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    const response = await order.findByIdAndUpdate(orderId,
      { orderStatus: status },
      { new: true });

    if (!response) {
      return res.status(404).json({
        message: "Order not found for the user"
      })
    }
    res.status(200).json({
      message: "Order Updated !"
    })

  }
  catch (err) {
    console.log("Error changing Order status ", err);
    res.status(500).json({
      message: "Server error"
    });
  }
}
const getOrderByid = async (req, res) => {

  try {
    const id = req.user.id || req.user._id;

    const orders = await order.find({ user: id }).populate("user").populate("items.book");

    if (!orders || orders.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No orders found for this user",
        data: []
      });
    }

    res.status(200).json({
      success: true,
      message: "order found for this user ",
      data: orders

    })

  }
  catch (err) {

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}

const CANCEL_WINDOW_MS = 24 * 60 * 60 * 1000;

const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.id || req.user._id;

    const existingOrder = await order.findOne({ _id: orderId, user: userId });

    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    if (existingOrder.orderStatus !== "processing") {
      return res.status(400).json({
        success: false,
        message: "Order can no longer be cancelled once it is shipped"
      });
    }

    const createdAt = new Date(existingOrder.createdAt).getTime();
    if (Date.now() - createdAt > CANCEL_WINDOW_MS) {
      return res.status(400).json({
        success: false,
        message: "Cancellation window of 24 hours has expired"
      });
    }

    existingOrder.orderStatus = "cancelled";
    await existingOrder.save();

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: existingOrder
    });
  } catch (err) {
    console.log("Error cancelling order ", err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

module.exports = { addUser, loginUser, logoutuser, checkAuth, getuserDetails, manageOrders, viewOrders, changeOrderStatus, getOrderByid, cancelOrder }