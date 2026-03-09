const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },

    items: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "books",
          required: true
        },

        title: {
          type: String,
          required: true
        },

        priceAtPurchase: {
          type: Number,
          required: true
        },

        quantity: {
          type: Number,
          required: true
        }
      }
    ],

    totalAmount: {
      type: Number,
      required: true
    },

    paymentId: {
      type: String,
      required: true
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending"
    },

    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);