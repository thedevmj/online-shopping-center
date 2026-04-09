import React, { useEffect, useState, useContext } from "react";
import { getallfavorite, addtoFavorite, removeFromfav } from "../api/bookapi";
import { useNavigate } from "react-router-dom";
import { Bookcontext } from "./BookContext";
import { HeartIcon, ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const { setSelectedBook } = useContext(Bookcontext);
  

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
        const role=localStorage.getItem("user");
      if (!role) {
        navigate("/login");
        return;
      }
      const response = await fetch(`http://localhost:3000/api/book/favoritebooks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setFavorites(data.data || []);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }
  };

  const handleRemoveFavorite = async (favoriteId, bookId) => {
    try {
      await fetch(`http://localhost:3000/api/book/removefromfavorite/${bookId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      setFavorites(favorites.filter((fav) => fav._id !== favoriteId)); // Filter by favorite record ID
      alert("Book removed from favorites!");
    } catch (err) {
      console.error("Error removing favorite:", err);
      alert("Failed to remove from favorites");
    }
  }; 

  const handleAddToCart = (book) => {
    localStorage.setItem("selectedBook", JSON.stringify(book));
    setSelectedBook(book);
    navigate("/ordercart");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-6 relative overflow-hidden">
   
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-linear-to-r from-emerald-400/10 to-emerald-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-linear-to-r from-blue-400/10 to-blue-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-linear-to-r from-purple-400/10 to-purple-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      
      <div className="relative z-10 max-w-7xl mx-auto">
       
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-3 flex items-center gap-3">
            <HeartIcon className="w-10 h-10 text-emerald-400" />
            My Favorites
          </h1>
          <p className="text-white/70 text-lg">
            {favorites.length} book{favorites.length !== 1 ? "s" : ""} in your favorites
          </p>
        </div>


        {favorites.length === 0 ? (
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-16 border border-white/20 text-center">
            <HeartIcon className="w-20 h-20 text-white/30 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-2">No Favorites Yet</h2>
            <p className="text-white/70 mb-8 text-lg">
              Start adding your favorite books to see them here!
            </p>
            <button
              onClick={() => navigate("/shopping")}
              className="px-8 py-3 bg-linear-to-r from-emerald-400 to-emerald-500 text-slate-900 font-bold rounded-full hover:shadow-2xl hover:shadow-emerald-500/50 transition-all transform hover:scale-105"
            >
              Browse Books
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((fav) => {
              const book = fav.book;
              return (
              <div
                key={book._id}
                className="group backdrop-blur-xl bg-white/10 rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20"
              >
                
                <div className="relative overflow-hidden h-64 bg-linear-to-br from-slate-800 to-slate-900">
                  <img
                    src={book.image}
                    alt={book.bookTitle}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  
                  <div className="absolute top-3 right-3 bg-emerald-400/20 backdrop-blur-md rounded-full p-2 border border-emerald-400/40">
                    <HeartIcon className="w-5 h-5 text-emerald-400 fill-emerald-400" />
                  </div>
                </div>

                
                <div className="p-5">
                  
                  {book.bookCategory && book.bookCategory.length < 20 && (
                    <span className="text-xs font-semibold text-emerald-300 bg-emerald-400/20 px-3 py-1 rounded-full">
                      {book.bookCategory}
                    </span>
                  )}

               
                  <h3 className="text-white font-bold text-lg mt-3 line-clamp-2">
                    {book.bookTitle}
                  </h3>

                 
                  <p className="text-white/70 text-sm mt-1">
                    by {book.bookAuthor}
                  </p>

                  
                  <div className="flex items-center mt-3 gap-1">
                    <span className="text-yellow-400 text-sm">★★★★☆</span>
                    <span className="text-white/50 text-xs">(4.5)</span>
                  </div>

                 
                  <div className="flex items-baseline gap-2 mt-4">
                    <span className="text-2xl font-bold text-emerald-300">
                      ${book.bookPrice}
                    </span>
                    <span className="text-white/40 line-through text-sm">
                      ${Math.round(book.bookPrice * 1.2)}
                    </span>
                  </div>

                  
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => handleAddToCart(book)}
                      className="flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-emerald-400 to-emerald-500 text-slate-900 font-bold py-2 rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all transform hover:scale-105"
                    >
                      <ShoppingCartIcon className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemoveFavorite(fav._id, book._id)}
                      className="px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-400/30 rounded-lg transition-all"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
