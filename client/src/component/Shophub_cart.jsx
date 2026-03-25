import React, { createContext, useContext } from "react";
import { getallbooks } from "../api/bookapi";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bookcontext } from "./BookContext";

export default function Shophub_cart({ category, filter }) {
  const [books, setBooks] = useState([]);
  
  
  
  const navigate = useNavigate();

  const { setSelectedBook } = useContext(Bookcontext);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await getallbooks();

        setBooks(res.data.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };
    fetchBooks();
  }, []);
  const handleCart = (book) => {
    localStorage.setItem("selectedBook", JSON.stringify(book));
    setSelectedBook(book);
    navigate("/ordercart");
  };
 
  const filteredByCategory = category
    ? books.filter((book) => book.bookCategory === category)
    : books;

  const applyFilter = (list, filterKey) => {
    const clone = [...list];
    switch (filterKey) {
      case "price-asc":
        return clone.sort((a, b) => a.bookPrice - b.bookPrice);
      case "price-desc":
        return clone.sort((a, b) => b.bookPrice - a.bookPrice);
      case "az":
        return clone.sort((a, b) => a.bookTitle.localeCompare(b.bookTitle));
      case "za":
        return clone.sort((a, b) => b.bookTitle.localeCompare(a.bookTitle));
      default:
        return clone;
    }
  };

  const filteredBooks = applyFilter(filteredByCategory, filter);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-linear-to-r from-emerald-400/10 to-emerald-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-linear-to-r from-blue-400/10 to-blue-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-linear-to-r from-purple-400/10 to-purple-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.length === 0 || filteredBooks.length === 0 ? (
            <div className="col-span-full">
              <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-12 text-center border border-white/20">
                <p className="text-white/80 text-xl">No books found</p>
              </div>
            </div>
          ) : (
            filteredBooks.map((book) => (
              <div
                key={book._id}
                className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 p-6 border border-white/20 hover:bg-white/15 hover:scale-105 group"
              >
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img
                    src={book.image}
                    alt={book.bookTitle}
                    className="w-full h-48 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
                  {book.bookTitle}
                </h2>

                <p className="text-white/70 mb-4 line-clamp-1">by {book.bookAuthor}</p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-emerald-300">
                    ${book.bookPrice}
                  </span>

                  <button
                    className="bg-linear-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 backdrop-blur-sm border border-white/20"
                    onClick={() => handleCart(book)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
