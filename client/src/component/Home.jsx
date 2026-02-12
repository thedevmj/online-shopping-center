import React, { useEffect, useState } from "react";
import { createbook, getallbooks } from "../api/bookapi";

const INITIAL_FORM_STATE = {
  bookname: "",
  bookTitle: "",
  bookAuthor: "",
  bookPrice: "",
  publishDate: "",
};

export default function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const fetchBooks = async () => {
    try {
      const res = await getallbooks();
      setBooks(res.data.data);
    } catch (err) {
      console.error("Error fetching books:", err);
      showMessage("error", "Failed to fetch books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const book= await createbook(formData);
      setFormData(book);
      showMessage("success", "Book added successfully!");
      fetchBooks();
    } catch (err) {
      console.error("Error creating book:", err);
      showMessage("error", "Failed to create book");
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      
      {message.text && (
        <div
          className={`mb-4 p-3 rounded-md text-white ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message.text}
        </div>
      )}

    
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Book</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Book Name
            </label>
            <input
              type="text"
              placeholder="Book name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="bookname"
              value={formData.bookname}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Book Title
            </label>
            <input
              type="text"
              placeholder="Book title"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="bookTitle"
              value={formData.bookTitle}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Book Author
            </label>
            <input
              type="text"
              placeholder="Book author"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="bookAuthor"
              value={formData.bookAuthor}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Book Price
            </label>
            <input
              type="number"
              placeholder="Book price"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="bookPrice"
              value={formData.bookPrice}
              onChange={handleInputChange}
              required
              step="0.01"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Publish Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="publishDate"
              value={formData.publishDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>

     
      <div className="w-full max-w-4xl my-10 overflow-x-auto">
        <table className="w-full border border-gray-300 text-left bg-white">
          <thead className="bg-amber-200">
            <tr>
              <th className="px-4 py-3">Book Name</th>
              <th className="px-4 py-3">Book Title</th>
              <th className="px-4 py-3">Book Author</th>
              <th className="px-4 py-3">Publish Date</th>
              <th className="px-4 py-3">Book Price</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {books.length > 0 ? (
              books.map((book) => (
                <tr key={book._id} className="hover:bg-gray-100">
                  <td className="px-4 py-3">{book.bookname}</td>
                  <td className="px-4 py-3">{book.bookTitle}</td>
                  <td className="px-4 py-3">{book.bookAuthor}</td>
                  <td className="px-4 py-3">
                    {new Date(book.publishDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">${parseFloat(book.bookPrice).toFixed(2)}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(true);
                        setEditingId(book._id);
                        setFormData(book);
                      }}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-3 text-center text-gray-500">
                  No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Edit Book</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Book Name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="bookname"
                value={formData.bookname}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Book Title"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="bookTitle"
                value={formData.bookTitle}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Book Author"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="bookAuthor"
                value={formData.bookAuthor}
                onChange={handleInputChange}
              />
              <input
                type="number"
                placeholder="Book Price"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="bookPrice"
                value={formData.bookPrice}
                onChange={handleInputChange}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
