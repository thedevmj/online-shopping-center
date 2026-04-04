import React, { useEffect, useState, useCallback } from "react";
import { Deletebook, getallbooks, Updatebooks } from "../api/bookapi";
import {
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  CheckIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

export default function Update_books() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    bookname: "",
    bookTitle: "",
    bookAuthor: "",
    bookPrice: "",
    publishDate: "",
  });

  const showMessage = useCallback((type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Updatebooks(editingId, formData);
      showMessage("success", "Book updated successfully!");
      setIsEditing(false);
      setEditingId(null);
      setFormData({
        bookname: "",
        bookTitle: "",
        bookAuthor: "",
        bookPrice: "",
        publishDate: "",
      });
      fetchBooks();
    } catch (err) {
      showMessage("error", "Failed to update book");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await Deletebook(id);
        showMessage("success", "Book deleted successfully!");
        fetchBooks();
      } catch (err) {
        showMessage("error", "Failed to delete book");
        console.error("Error deleting book:", err);
      }
    }
  };

  const handleEdit = (book) => {
    setFormData({
      bookname: book.bookname,
      bookTitle: book.bookTitle,
      bookAuthor: book.bookAuthor,
      bookPrice: book.bookPrice,
      publishDate: book.publishDate.split("T")[0],
    });
    setEditingId(book._id);
    setIsEditing(true);
  };

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await getallbooks();
      setBooks(res.data.data);
    } catch (err) {
      showMessage("error", "Failed to fetch books");
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Message Toast */}
      {message.text && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg backdrop-blur-xl border flex items-center gap-2 animate-in fade-in slide-in-from-top-4 ${
            message.type === "success"
              ? "bg-green-500/20 border-green-400/60 text-green-300"
              : "bg-red-500/20 border-red-400/60 text-red-300"
          }`}
        >
          {message.type === "success" ? (
            <CheckIcon className="h-5 w-5" />
          ) : (
            <XMarkIcon className="h-5 w-5" />
          )}
          {message.text}
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpenIcon className="h-8 w-8 text-emerald-400" />
            <h1 className="text-4xl font-bold bg-linear-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Update Books
            </h1>
          </div>
          <p className="text-emerald-300/60">Manage and update your book inventory</p>
        </div>

        {/* Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/50">
            <div className="w-full max-w-2xl rounded-lg backdrop-blur-xl bg-linear-to-br from-slate-700/50 to-slate-800/50 border border-emerald-500/20 p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-emerald-400">Edit Book</h2>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditingId(null);
                    setFormData({
                      bookname: "",
                      bookTitle: "",
                      bookAuthor: "",
                      bookPrice: "",
                      publishDate: "",
                    });
                  }}
                  className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-emerald-300 mb-2">
                      Book Name
                    </label>
                    <input
                      type="text"
                      name="bookname"
                      value={formData.bookname}
                      onChange={handleInputChange}
                      placeholder="Enter book name"
                      className="w-full px-4 py-2 bg-slate-700/50 border border-emerald-500/30 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-300 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      name="bookTitle"
                      value={formData.bookTitle}
                      onChange={handleInputChange}
                      placeholder="Enter book title"
                      className="w-full px-4 py-2 bg-slate-700/50 border border-emerald-500/30 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-300 mb-2">
                      Author
                    </label>
                    <input
                      type="text"
                      name="bookAuthor"
                      value={formData.bookAuthor}
                      onChange={handleInputChange}
                      placeholder="Enter author name"
                      className="w-full px-4 py-2 bg-slate-700/50 border border-emerald-500/30 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-300 mb-2">
                      Price
                    </label>
                    <input
                      type="number"
                      name="bookPrice"
                      value={formData.bookPrice}
                      onChange={handleInputChange}
                      placeholder="Enter price"
                      step="0.01"
                      className="w-full px-4 py-2 bg-slate-700/50 border border-emerald-500/30 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-emerald-300 mb-2">
                      Publish Date
                    </label>
                    <input
                      type="date"
                      name="publishDate"
                      value={formData.publishDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-700/50 border border-emerald-500/30 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 transition-all"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-emerald-500/20 border border-emerald-400/60 text-emerald-300 font-medium hover:bg-emerald-500/30 transition-all duration-200"
                  >
                    <CheckIcon className="h-5 w-5" />
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditingId(null);
                      setFormData({
                        bookname: "",
                        bookTitle: "",
                        bookAuthor: "",
                        bookPrice: "",
                        publishDate: "",
                      });
                    }}
                    className="flex-1 py-3 rounded-lg bg-slate-700/50 border border-slate-600/60 text-slate-300 font-medium hover:bg-slate-600/50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Books Table */}
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-500/10 mb-4 animate-pulse">
                <div className="h-8 w-8 border-t-2 border-emerald-400 rounded-full animate-spin" />
              </div>
              <p className="text-emerald-300">Loading books...</p>
            </div>
          </div>
        ) : (
          <div className="rounded-lg backdrop-blur-xl bg-linear-to-br from-slate-700/50 to-slate-800/50 border border-emerald-500/20 overflow-x-auto shadow-2xl">
            <table className="w-full">
              <thead>
                <tr className="border-b border-emerald-500/20 bg-slate-800/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">
                    Book Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">
                    Author
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">
                    Publish Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">
                    Price
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-emerald-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {books.length > 0 ? (
                  books.map((book) => (
                    <tr
                      key={book._id}
                      className="hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-emerald-300">{book.bookname}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-300">{book.bookTitle}</td>
                      <td className="px-6 py-4 text-slate-300">{book.bookAuthor}</td>
                      <td className="px-6 py-4 text-slate-300">
                        {new Date(book.publishDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 font-semibold text-emerald-400">
                        ${parseFloat(book.bookPrice).toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(book)}
                            className="p-2 rounded-lg hover:bg-emerald-500/20 text-emerald-400 transition-colors"
                            title="Edit book"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(book._id)}
                            className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                            title="Delete book"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-slate-400">
                      No books found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer Stats */}
        {!loading && books.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg backdrop-blur-xl bg-slate-700/30 border border-emerald-500/20">
              <p className="text-slate-400 text-sm">Total Books</p>
              <p className="text-3xl font-bold text-emerald-400 mt-2">{books.length}</p>
            </div>
            <div className="p-4 rounded-lg backdrop-blur-xl bg-slate-700/30 border border-emerald-500/20">
              <p className="text-slate-400 text-sm">Average Price</p>
              <p className="text-3xl font-bold text-emerald-400 mt-2">
                ${(
                  books.reduce((sum, b) => sum + parseFloat(b.bookPrice), 0) /
                  books.length
                ).toFixed(2)}
              </p>
            </div>
            <div className="p-4 rounded-lg backdrop-blur-xl bg-slate-700/30 border border-emerald-500/20">
              <p className="text-slate-400 text-sm">Total Inventory Value</p>
              <p className="text-3xl font-bold text-emerald-400 mt-2">
                ${books
                  .reduce((sum, b) => sum + parseFloat(b.bookPrice), 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
