import React, { useEffect } from "react";
import { Bookcontext } from "./BookContext";
import { useState } from "react";
import { cartadd } from "../api/bookapi";


export default function OrderCart() {
  
  const book = JSON.parse(localStorage.getItem("selectedBook"));
  const {selectedBook } = React.useContext(Bookcontext|| null);
  const [Count, setcartCount] = useState(1);
 
  const bookData = selectedBook || book;

  if (!bookData) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        No book selected. Please go back and select a book.
      </div>
    );
  }

  const addToCart = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/book/addtocart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
      body: JSON.stringify({
        bookId: bookData._id,
        quantity: Count,
        
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add book to cart");
    }

    const data = await response.json();
    alert("Book added to cart!");
  } catch (err) {
    console.error("Error adding book to cart:", err);
    alert("Failed to add book to cart");
  }
};

  

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-linear-to-r from-emerald-400/10 to-emerald-300/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-linear-to-r from-blue-400/10 to-blue-300/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-linear-to-r from-purple-400/10 to-purple-300/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto backdrop-blur-xl bg-white/10 rounded-3xl p-8 grid md:grid-cols-2 gap-10 border border-white/20 shadow-2xl">
          <div className="relative">
            <img
              src={bookData.image}
              alt={bookData.bookTitle}
              className="w-full h-96 object-cover rounded-3xl shadow-2xl border border-white/20"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent rounded-3xl"></div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {bookData.bookTitle}
              </h1>
              <p className="text-white/70 text-lg">by {bookData.bookAuthor}</p>
            </div>

            <div className="flex items-center">
              <span className="text-yellow-400 text-xl">★★★★☆</span>
              <span className="ml-3 text-white/80">(120 reviews)</span>
            </div>

            <div className="space-y-2">
              <span className="text-4xl font-bold text-emerald-300">
                ${bookData.bookPrice}
              </span>
              <span className="ml-4 text-white/50 line-through text-xl">
                ${(bookData.bookPrice) + 10}
              </span>
              <span className="ml-4 text-emerald-300 font-semibold bg-emerald-400/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-emerald-400/30">
                20% Off
              </span>
            </div>

            <div className="flex items-center text-emerald-300">
              <div className="w-3 h-3 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
              <span className="font-medium">In Stock</span>
            </div>

            <div>
              <label className="block mb-3 font-semibold text-white/90">Quantity</label>
              <select
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white focus:border-emerald-400/50 focus:outline-none focus:ring-0 transition-all duration-300"
                value={Count}
                onChange={(e) => setcartCount(parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => (
                  <option key={qty} value={qty} className="bg-slate-800 text-white">{qty}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                className="flex-1 bg-linear-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 backdrop-blur-sm border border-white/20"
                onClick={addToCart}
              >
                Add to Cart
              </button>

              <button className="flex-1 bg-linear-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 backdrop-blur-sm border border-white/20">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto backdrop-blur-xl bg-white/10 rounded-3xl p-8 mt-10 border border-white/20 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-6">Product Description</h2>
          <p className="text-white/80 leading-relaxed text-lg">
            {bookData.description}
          </p>
        </div>
      </div>
    </div>
  );
}
