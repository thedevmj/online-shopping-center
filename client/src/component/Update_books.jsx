import React, { useEffect, useState } from "react";
import { Deletebook, getallbooks, Updatebooks } from "../api/bookapi";

export default function Update_books() {
  const [isEditing, setIsEditing] = useState(null);
  const [EditingId, setEditingId] = useState(null);
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await Updatebooks(EditingId, formData);
      setIsEditing(false);
      setEditingId(null);
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = async (id) => {

    

    try {
      await Deletebook(id);
      setEditingId(null);
      fetchBooks();
    } catch (err) {
      console.error("Error deleting book:", err);
    }
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

  return (
    <div className="justify-center-safe">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="w-2xl bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h1 className="text-xl font-semibold text-gray-700 mb-4">Update</h1>

            <div className="space-y-4">
              <input
                type="text"
                name="bookname"
                value={formData.bookname || ""}
                onChange={handleInputChange}
                placeholder="Book Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />

              <input
                type="text"
                name="bookTitle"
                value={formData.bookTitle || ""}
                onChange={handleInputChange}
                placeholder="Book Title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />

              <input
                type="text"
                name="bookAuthor"
                value={formData.bookAuthor || ""}
                onChange={handleInputChange}
                placeholder="Book Author"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />

              <input
                type="number"
                name="bookPrice"
                value={formData.bookPrice || ""}
                onChange={handleInputChange}
                placeholder="Book Price"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />

              <input
                type="date"
                name="publishDate"
                value={formData.publishDate || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 shadow-sm hover:shadow-md transition duration-200"
              >
                Save
              </button>
              <button
                type="button"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 shadow-sm hover:shadow-md transition duration-200"
                onClick={() => {
                  setIsEditing(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div></div>
      )}

      <div className="w-full max-w-4xl my-10 overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3">Book Name</th>
              <th className="px-4 py-3">Book Title</th>
              <th className="px-4 py-3">Book Author</th>
              <th className="px-4 py-3">Publish Date</th>
              <th className="px-4 py-3">Book Price</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {books.map((book) => (
              <tr key={book._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 font-medium">{book.bookname}</td>
                <td className="px-4 py-3">{book.bookTitle}</td>
                <td className="px-4 py-3">{book.bookAuthor}</td>
                <td className="px-4 py-3">
                  {new Date(book.publishDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 font-semibold text-green-600">
                  ${parseFloat(book.bookPrice).toFixed(2)}
                </td>
                <td className="px-4 py-3 flex gap-2 justify-center">
                  <button
                    className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                    onClick={() => {
                      (setIsEditing(true), setEditingId(book._id));
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    onClick={() => {
                      (handleDelete(book._id));
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
