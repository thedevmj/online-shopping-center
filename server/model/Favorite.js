const mongoose = require("mongoose")

const myfavorite = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    },
    book: {
        type: mongoose.Schema.ObjectId,
        ref: "books",
        required: true
    },
    favorite: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const favorite = mongoose.model("favBook", myfavorite);
module.exports = favorite; 