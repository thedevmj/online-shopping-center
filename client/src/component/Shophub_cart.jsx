import React, { createContext, useContext } from "react";
import { getallbooks } from "../api/bookapi";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bookcontext } from "./BookContext";

export default function Shophub_cart() {
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();

  const { setSelectedBook } = useContext(Bookcontext);

  const fetchBooks = async () => {
    try {
      const res = await getallbooks();

      setBooks(res.data.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  const handleCart = (book) => {
    localStorage.setItem("selectedBook", JSON.stringify(book));
    setSelectedBook(book);
    navigate("/ordercart");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.length === 0 ? (
          <p>No books found</p>
        ) : (
          books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-6"
            >
              <img
                src={book.image}
                alt={book.bookTitle}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {book.bookTitle}
              </h2>

              <p className="text-gray-600 mb-4">by {book.bookAuthor}</p>

              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-indigo-600">
                  ${book.bookPrice}
                </span>

                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
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
  );
}
