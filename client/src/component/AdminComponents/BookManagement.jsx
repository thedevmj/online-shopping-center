import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from "react-router-dom";
import { buildApiUrl } from "../../config";

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
          <p className="font-medium text-lime-300">{book.bookTitle}</p>
          <p className="text-xs text-slate-400">{book.bookAuthor}</p>
        </div>
      </div>
    </td>

    <td className="px-6 py-4 text-slate-300">
      {book.bookCategory?.name || 'N/A'}
    </td>

    <td className="px-6 py-4 text-lime-400 font-semibold">
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
          className="p-2 rounded-lg hover:bg-lime-500/20 text-lime-400"
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const navigate = useNavigate(); 

  
  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        buildApiUrl('/api/book/getall'),
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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy]);

 
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

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedBooks.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const paginatedBooks = filteredAndSortedBooks.slice(startIndex, startIndex + pageSize);

  const pageNumbers = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        Math.abs(i - safePage) <= 1
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  }, [totalPages, safePage]);


  const handleEdit = useCallback((book) => {
    navigate("/updateBook", { state: { book } });
  }, [navigate]);

  const handleDelete = useCallback((bookId) => {
    navigate("/updateBook", { state: { bookId } });
    
  }, []);


  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  
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
        <thead>
          <tr className="border-b border-lime-500/20 bg-slate-800/50 text-left text-xs uppercase tracking-wider text-lime-400">
            <th className="px-6 py-3 text-lime-300">Book</th>
            <th className="px-6 py-3 text-lime-300">Category</th>
            <th className="px-6 py-3 text-lime-300">Price</th>
            <th className="px-6 py-3 text-lime-300">Stock</th>
            <th className="px-6 py-3 text-lime-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedBooks.map((book) => (
            <BookRow
              key={book._id}
              book={book}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-lime-500/20">
          <p className="text-sm text-slate-400">
            Showing {startIndex + 1}–
            {Math.min(startIndex + pageSize, filteredAndSortedBooks.length)} of{' '}
            {filteredAndSortedBooks.length} books
          </p>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-lime-300 border border-lime-500/30 hover:bg-lime-500/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Prev
            </button>

            {pageNumbers.map((n, i) =>
              n === '...' ? (
                <span key={`ellipsis-${i}`} className="px-2 text-slate-500">
                  ...
                </span>
              ) : (
                <button
                  key={n}
                  onClick={() => setCurrentPage(n)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                    n === safePage
                      ? 'bg-lime-500 text-slate-950'
                      : 'text-lime-300 border border-lime-500/30 hover:bg-lime-500/10'
                  }`}
                >
                  {n}
                </button>
              )
            )}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-lime-300 border border-lime-500/30 hover:bg-lime-500/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}