import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from "react-router-dom";

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

    <td className="px-6 py-4 text-slate-300">
      {book.bookCategory?.name || 'N/A'}
    </td>

    <td className="px-6 py-4 text-emerald-400 font-semibold">
      ${book.bookPrice}
    </td>

    <td className="px-6 py-4">
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          book.stock > 10
            ? 'bg-green-500/20 text-green-300'
            : book.stock > 0
            ? 'bg-yellow-500/20 text-yellow-300'
            : 'bg-red-500/20 text-red-300'
        }`}
      >
        {book.stock} units
      </span>
    </td>

    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(book)}
          className="p-2 rounded-lg hover:bg-emerald-500/20 text-emerald-400"
        >
          <PencilIcon className="h-5 w-5" />
        </button>

        <button
          onClick={() => onDelete(book._id)}
          className="p-2 rounded-lg hover:bg-red-500/20 text-red-400"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </td>
  </tr>
));

BookRow.displayName = 'BookRow';

export default function BookManagement({ search }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');

  const navigate = useNavigate(); // ✅ navigation

  // ✅ Fetch books
  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'http://localhost:3000/api/book/getall',
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        }
      );

      const data = await response.json();
      setBooks(data.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
    setSearchQuery(search || '');
  }, [fetchBooks, search]);

  // ✅ Filter + sort
  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter(
      (book) =>
        book.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.bookAuthor.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.bookPrice - b.bookPrice;
        case 'stock':
          return b.stock - a.stock;
        default:
          return a.bookTitle.localeCompare(b.bookTitle);
      }
    });

    return filtered;
  }, [books, searchQuery, sortBy]);

  // ✅ Navigate to update page
  const handleEdit = useCallback((book) => {
    navigate("/updateBook", { state: { book } });
  }, [navigate]);

  const handleDelete = useCallback((bookId) => {
    navigate("/updateBook", { state: { bookId } });
    
  }, []);

  // ✅ Loading UI
  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  // ✅ Main UI
  return (
    <div className="space-y-6">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 bg-slate-700 text-white w-full"
      />

      <table className="w-full">
        <tbody>
          {filteredAndSortedBooks.map((book) => (
            <BookRow
              key={book._id}
              book={book}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}