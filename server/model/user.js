const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true

    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"inactive",
    }

},
    {
        timestamps: true
    }
)

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.getSignedJwtToken=function(){
    return jwt.sign(
 {id:this._id,
    role:this.role
 },
 process.env.JWT_SECRET,
 {expiresIn:process.env.JWT_EXPIRE}
    );
}

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User=mongoose.model("User",userSchema);
module.exports=User;