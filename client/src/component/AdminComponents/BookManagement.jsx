import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ArrowUpDownIcon,
} from '@heroicons/react/24/outline';

const BookRow = React.memo(({ book, onEdit, onDelete }) => (
  <tr className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors">
    <td className="px-6 py-4">
      <div className="flex items-center gap-4">
        <img
          src={book.image}
          alt={book.bookTitle}
          className="h-12 w-12 rounded-lg object-cover"
        />
        <div>
          <p className="font-medium text-emerald-300">{book.bookTitle}</p>
          <p className="text-xs text-slate-400">{book.bookAuthor}</p>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 text-slate-300">{book.bookCategory}</td>
    <td className="px-6 py-4 text-emerald-400 font-semibold">${book.bookPrice}</td>
    <td className="px-6 py-4">
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        book.stock > 10
          ? 'bg-green-500/20 text-green-300'
          : book.stock > 0
          ? 'bg-yellow-500/20 text-yellow-300'
          : 'bg-red-500/20 text-red-300'
      }`}>
        {book.stock} units
      </span>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(book)}
          className="p-2 rounded-lg hover:bg-emerald-500/20 text-emerald-400 transition-colors"
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDelete(book._id)}
          className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </td>
  </tr>
));

BookRow.displayName = 'BookRow';

export default function BookManagement() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      // Replace with actual API call
      // const response = await fetch('/api/books');
      // const data = await response.json();
      // setBooks(data.data);

      // Placeholder data
      setBooks([
        {
          _id: '1',
          bookTitle: 'The Great Gatsby',
          bookAuthor: 'F. Scott Fitzgerald',
          bookCategory: 'Fiction',
          bookPrice: 12.99,
          stock: 15,
          image: 'https://via.placeholder.com/100',
        },
        {
          _id: '2',
          bookTitle: 'To Kill a Mockingbird',
          bookAuthor: 'Harper Lee',
          bookCategory: 'Drama',
          bookPrice: 14.99,
          stock: 8,
          image: 'https://via.placeholder.com/100',
        },
        {
          _id: '3',
          bookTitle: '1984',
          bookAuthor: 'George Orwell',
          bookCategory: 'Dystopian',
          bookPrice: 13.99,
          stock: 0,
          image: 'https://via.placeholder.com/100',
        },
        {
          _id: '4',
          bookTitle: 'Pride and Prejudice',
          bookAuthor: 'Jane Austen',
          bookCategory: 'Romance',
          bookPrice: 11.99,
          stock: 22,
          image: 'https://via.placeholder.com/100',
        },
      ]);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter(book =>
      book.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.bookAuthor.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort by selected criteria
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.bookPrice - b.bookPrice;
        case 'stock':
          return b.stock - a.stock;
        case 'title':
        default:
          return a.bookTitle.localeCompare(b.bookTitle);
      }
    });

    return filtered;
  }, [books, searchQuery, sortBy]);

  const handleDelete = useCallback((bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks(prev => prev.filter(book => book._id !== bookId));
    }
  }, []);

  const handleEdit = useCallback((book) => {
    setEditingBook(book);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-500/10 mb-4 animate-pulse">
            <div className="h-8 w-8 border-t-2 border-emerald-400 rounded-full animate-spin" />
          </div>
          <p className="text-emerald-300">Loading books...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex-1 w-full sm:max-w-md">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-emerald-500/30 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-400/60 transition-colors"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setSortBy(sortBy === 'title' ? 'price' : 'title')}
            className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 border border-emerald-500/30 rounded-lg text-slate-300 hover:bg-slate-600/50 transition-colors"
          >
            <ArrowUpDownIcon className="h-5 w-5" />
            Sort
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-400/60 rounded-lg text-emerald-300 hover:bg-emerald-500/30 transition-colors font-medium">
            <PlusIcon className="h-5 w-5" />
            Add Book
          </button>
        </div>
      </div>

      {/* Books Table */}
      <div className="rounded-lg backdrop-blur-xl bg-linear-to-br from-slate-700/50 to-slate-800/50 border border-emerald-500/20 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-emerald-500/20 bg-slate-800/50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">Stock</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedBooks.length > 0 ? (
              filteredAndSortedBooks.map(book => (
                <BookRow
                  key={book._id}
                  book={book}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-slate-400">
                  No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Stats Footer */}
      <div className="flex justify-between items-center text-sm text-slate-400">
        <p>Showing {filteredAndSortedBooks.length} of {books.length} books</p>
      </div>
    </div>
  );
}
