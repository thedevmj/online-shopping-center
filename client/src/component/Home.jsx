import React, { useEffect, useState } from "react";
import { createbook, getallbooks } from "../api/bookapi";

const INITIAL_FORM_STATE = {
  bookname: "",
  bookTitle: "",
  bookAuthor: "",
  bookPrice: "",
  publishDate: "",
  stock: 1,
  bookImage: null,
};
const [category,setcategory]=useState("");

const default_category = [
  {
    type:"fiction",
    category:[
      {
        id:"fantasy",
        value:"fantasy"
      },
      {
        id:"scifi",
        value:"scifi"
      },
      {
        id:"romantic",
        value:"romantic"
      },
      {
        id:"thriller",
        value:"thriller"
      },{
        id:"historical",
        value:"historical"
      }
    ]
  },
];

export default function Home() {
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
      const data = new FormData();

      data.append("bookname", formData.bookname);
      data.append("bookTitle", formData.bookTitle);
      data.append("bookAuthor", formData.bookAuthor);
      data.append("bookPrice", formData.bookPrice);
      data.append("publishDate", formData.publishDate);
      data.append("stock", formData.stock);
      data.append("image", formData.bookImage);

      await createbook(data);
      setFormData(INITIAL_FORM_STATE);
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
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock
            </label>
            <input
              type="Number"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  bookImage: e.target.files[0],
                }))
              }
            />
          </div>

          <div>
            <select name="" id="">
              <option value=""></option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
