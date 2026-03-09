import React, { useEffect } from "react";
import { Bookcontext } from "./BookContext";
import { useState } from "react";
import { cartadd, getcartById } from "../api/bookapi";


export default function OrderCart() {
  const user = JSON.parse(localStorage.getItem("user"));
  const book = JSON.parse(localStorage.getItem("selectedBook"));
  const {selectedBook } = React.useContext(Bookcontext);
  const [Count, setcartCount] = useState(1);
  const token = localStorage.getItem("token");
  const bookData = selectedBook || book;
  

  const findbook = async () => {
    try {
    
      const res = await getcartById(bookData._id);
      console.log("Book found in cart !", res.data.data);
      return res.data.data;
    } catch (err) {
      console.log("Error occured in finding book in cart !", err.message);
      return null;
    }
  };
  

  const addToCart = async () => {
    try {
      
      const exists=await findbook();

      if (exists) {
        console.log("Book already in cart !");
        return;
      }
      await cartadd({
        user: user._id,
        bookId: bookData._id,
        quantity: Count,
      });
      console.log("Book added to cart !");
    } catch (err) {
      console.log("Error occured in adding book to cart ", err);
    }
  };
  

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8 grid md:grid-cols-2 gap-10">
        <div>
          <img
            src={selectedBook.image|| bookData.image}
            alt={selectedBook.bookTitle|| bookData.bookTitle}
            className="w-full h-112.5 object-cover rounded-xl shadow-md"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {selectedBook.bookTitle|| bookData.bookTitle}
          </h1>

          <p className="text-gray-500 mt-2">by {selectedBook.bookAuthor|| bookData.bookAuthor}</p>

          <div className="flex items-center mt-3">
            <span className="text-yellow-500 text-lg">★★★★☆</span>
            <span className="ml-2 text-gray-600">(120 reviews)</span>
          </div>

          <div className="mt-6">
            <span className="text-3xl font-bold text-indigo-600">
              ${selectedBook.bookPrice|| bookData.bookPrice}
            </span>
            <span className="ml-3 text-gray-400 line-through">
              ${selectedBook.bookPrice + 10}
            </span>
            <span className="ml-3 text-green-600 font-semibold">20% Off</span>
          </div>

          <p className="mt-4 text-green-600 font-medium">In Stock</p>

          <div className="mt-4">
            <label className="block mb-2 font-medium">Quantity</label>
            <select
              className="border rounded-lg p-2 w-24"
              value={Count}
              onChange={(e) => setcartCount(parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => (
                <option key={qty} value={qty}>{qty}</option>
              ))}
            </select>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold w-full"
              onClick={addToCart}
            >
              Add to Cart
            </button>

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold w-full">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10">
        <h2 className="text-2xl font-bold mb-4">Product Description</h2>
        <p className="text-gray-700 leading-relaxed">
          {selectedBook.description|| bookData.description}
        </p>
      </div>
    </div>
  );
}
