import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../api/bookapi";
import { showToast } from "./Toast";

export default function UserOrders() {
  const book = JSON.parse(localStorage.getItem("selectedBook") || "null");
  const [cart, setCartCount] = useState(() => {
    const qty = Number(localStorage.getItem("selectedQuantity"));
    return qty > 0 ? qty : 1;
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBookPurchase = async () => {
    if (!book) return;
    setLoading(true);
    try {
      const data = await createOrder({
        items: [
          {
            book: book._id,
            title: book.bookTitle,
            priceAtPurchase: book.bookPrice,
            quantity: cart,
          },
        ],
        paymentId: "id239875yt4u34",
      });

      if (!data || data.success !== true) {
        throw new Error(data?.message || "Failed to place the order");
      }
      localStorage.removeItem("selectedBook");
      localStorage.removeItem("selectedQuantity");
      showToast("Order purchased successfully!", "success");
      navigate("/vieworder");
    } catch (err) {
      console.log("Sorry failed to order ", err);
      showToast(
        err?.message || "Sorry, failed to place the order.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 flex items-center justify-center">
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl text-center">
          <p className="text-white/80 text-lg">
            No book selected. Please go back and choose a book.
          </p>
          <div className="mt-4 flex gap-3 justify-center">
            <button
              onClick={() => navigate("/shopping")}
              className="px-6 py-3 rounded-2xl bg-linear-to-r from-lime-400 to-lime-500 text-slate-950 font-semibold shadow-lg"
            >
              Browse Books
            </button>
            <button
              onClick={() => navigate("/vieworder")}
              className="px-6 py-3 rounded-2xl bg-lime-500/20 border border-lime-400/60 text-lime-300 font-semibold"
            >
              View My Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-linear-to-r from-lime-400/10 to-lime-300/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-linear-to-r from-blue-400/10 to-blue-300/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-linear-to-r from-lime-400/10 to-lime-300/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto backdrop-blur-xl bg-white/10 rounded-3xl p-8 grid md:grid-cols-2 gap-10 border border-white/20 shadow-2xl">
          <div className="relative">
            <img
              src={book.image}
              alt={book.bookTitle}
              className="w-full h-96 object-cover rounded-3xl shadow-2xl border border-white/20"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent rounded-3xl"></div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {book.bookTitle}
              </h1>
              <p className="text-white/70 text-lg">by {book.bookAuthor}</p>
            </div>

            <div className="flex items-center">
              <span className="text-yellow-400 text-xl">★★★★☆</span>
              <span className="ml-3 text-white/80">(120 reviews)</span>
            </div>

            <div className="space-y-2">
              <span className="text-4xl font-bold text-lime-300">
                ${book.bookPrice}
              </span>
            </div>

            <div className="flex items-center text-lime-300">
              <div className="w-3 h-3 bg-lime-400 rounded-full mr-3 animate-pulse"></div>
              <span className="font-medium">In Stock</span>
            </div>

            <div>
              <label className="block mb-3 font-semibold text-white/90">
                Quantity
              </label>
              <select
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white focus:border-lime-400/50 focus:outline-none focus:ring-0 transition-all duration-300"
                value={cart}
                onChange={(e) => setCartCount(parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => (
                  <option
                    key={qty}
                    value={qty}
                    className="bg-slate-800 text-white"
                  >
                    {qty}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-lime-500/20 border border-lime-400/60 text-lime-300 font-medium hover:bg-lime-500/30 transition-all duration-200"
                onClick={handleBookPurchase}
              >
                {loading ? "Processing..." : "Purchase"}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto backdrop-blur-xl bg-white/10 rounded-3xl p-8 mt-10 border border-white/20 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-6">
            Product Description
          </h2>
          <p className="text-white/80 leading-relaxed text-lg">
            {book.description || ""}
          </p>
        </div>
      </div>
    </div>
  );
}