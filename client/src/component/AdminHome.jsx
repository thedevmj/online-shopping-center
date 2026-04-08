import React, { useEffect, useState } from "react";
import { createbook, getallbooks, getallCategories } from "../api/bookapi";

const INITIAL_FORM_STATE = {
  bookname: "",
  bookTitle: "",
  bookAuthor: "",
  bookPrice: "",
  publishDate: "",
  bookCategory:"",
  stock: 1,
  description:"",
  bookImage: null,
};


export default function Home() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [category,setcategory]=useState([]);
  
  const [iseditable,setisEditable]=useState(false);
 
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


  const fetch_category=async()=>{
    try{

      const ctg=await getallCategories();
      setcategory(ctg.data.data);
    }
    catch(err){
      
    }
  }
  
  useEffect(() => { 
    fetchBooks();
    fetch_category();
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
      data.append("bookCategory",formData.bookCategory);
      data.append("stock", formData.stock);
      data.append("description", formData.description);
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
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-6 relative overflow-hidden">
   
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-linear-to-r from-emerald-400/10 to-emerald-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-linear-to-r from-blue-400/10 to-blue-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-linear-to-r from-purple-400/10 to-purple-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {message.text && (
              <div
                className={`mb-6 p-4 rounded-2xl backdrop-blur-xl border text-white text-center font-semibold ${
                  message.type === "success"
                    ? "bg-emerald-500/20 border-emerald-400/30"
                    : "bg-red-500/20 border-red-400/30"
                }`}
              >
                {message.text}
              </div>
            )}

        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-linear-to-br from-emerald-400 to-emerald-500 rounded-2xl mb-6 shadow-lg">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Add New Book
            </h2>
            <p className="text-white/80">Expand your collection</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-3">
                  Book Name
                </label>
                <input
                  type="text"
                  placeholder="Book name"
                  className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 transition-all duration-300 focus:bg-white/15 focus:border-emerald-400/50 focus:outline-none focus:ring-0 backdrop-blur-sm"
                  name="bookname"
                  value={formData.bookname}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/90 mb-3">
                  Book Title
                </label>
                <input
                  type="text"
                  placeholder="Book title"
                  className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 transition-all duration-300 focus:bg-white/15 focus:border-emerald-400/50 focus:outline-none focus:ring-0 backdrop-blur-sm"
                  name="bookTitle"
                  value={formData.bookTitle}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-3">
                  Book Author
                </label>
                <input
                  type="text"
                  placeholder="Book author"
                  className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 transition-all duration-300 focus:bg-white/15 focus:border-emerald-400/50 focus:outline-none focus:ring-0 backdrop-blur-sm"
                  name="bookAuthor"
                  value={formData.bookAuthor}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/90 mb-3">
                  Book Price
                </label>
                <input
                  type="number"
                  placeholder="Book price"
                  className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 transition-all duration-300 focus:bg-white/15 focus:border-emerald-400/50 focus:outline-none focus:ring-0 backdrop-blur-sm"
                  name="bookPrice"
                  value={formData.bookPrice}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-3">
                  Publish Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white transition-all duration-300 focus:bg-white/15 focus:border-emerald-400/50 focus:outline-none focus:ring-0 backdrop-blur-sm"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/90 mb-3">
                  Stock
                </label>
                <input
                  type="number"
                  placeholder="Stock quantity"
                  className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 transition-all duration-300 focus:bg-white/15 focus:border-emerald-400/50 focus:outline-none focus:ring-0 backdrop-blur-sm"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white/90 mb-3">
                Description
              </label>
              <textarea
                placeholder="Book description"
                className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 transition-all duration-300 focus:bg-white/15 focus:border-emerald-400/50 focus:outline-none focus:ring-0 backdrop-blur-sm resize-none"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white/90 mb-3">
                Book Cover Image
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bookImage: e.target.files[0],
                    }))
                  }
                  className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-400/20 file:text-emerald-300 hover:file:bg-emerald-400/30 transition-all duration-300 backdrop-blur-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white/90 mb-3">
                Category
              </label>
              <select
                name="bookCategory"
                value={formData.bookCategory}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white transition-all duration-300 focus:bg-white/15 focus:border-emerald-400/50 focus:outline-none focus:ring-0 backdrop-blur-sm"
              >
                <option value="" className="bg-slate-800 text-white">Select category</option>
                {Array.isArray(category) && category.map((cat) => (
                  <option key={cat._id} value={cat._id} className="bg-slate-800 text-white">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-linear-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 backdrop-blur-sm border border-white/20"
            >
              Add Book to Collection
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
