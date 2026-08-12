import React, {
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { addtoFavorite, getallbooks } from "../api/bookapi";
import { useNavigate } from "react-router-dom";
import { Bookcontext } from "./BookContext";
import Billboard from "./Billboard";
import { HeartIcon } from "@heroicons/react/24/outline";

export default function Shophub_cart({ category, filter, search, setsearch }) {
  const navigate = useNavigate();
  const { setSelectedBook, books, setBooks } = useContext(Bookcontext);

  useEffect(() => {
    let isMounted = true;

    const fetchBooks = async () => {
      if (books.length > 0) {
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/book/getall", {
          method: "GET",

          credentials: "include",
        });
        const data = await response.json();

        if (!isMounted) return;
        setBooks(data.data || []);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchBooks();

    return () => {
      isMounted = false;
    };
  }, [books.length, setBooks]);

  const handleCart = useCallback(
    (book) => {
      localStorage.setItem("selectedBook", JSON.stringify(book));
      setSelectedBook(book);
      navigate("/ordercart");
    },
    [navigate, setSelectedBook],
  );

  const handlefavoritebook = useCallback(async (book) => {
    try {
      const response = await addtoFavorite(book._id);
      alert("Book added to favorites!");
    } catch (err) {
      console.error("Error adding book to favorite:", err);
    }
  }, []);

  const handleClearSearch = useCallback(() => {
    setsearch("");
  }, [setsearch]);

  const scrollToBooks = useCallback(() => {
    document.getElementById("books-grid")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const featuredBook = books.find((book) => book?.image) || books[0];

 const filteredBooks = useMemo(() => {
  let base = books;

  
  if (category) {
    base = books.filter((book) => {
      if (!book.bookCategory) return false;

      const bookCat =
        typeof book.bookCategory === "object"
          ? book.bookCategory._id
          : book.bookCategory;

      return String(bookCat) === String(category);
    });
  }

 
  const searchTerm = search?.trim().toLowerCase();
  let filtered = base;

  if (searchTerm) {
    filtered = base.filter((book) => {
      const title = book.bookTitle?.toLowerCase() || "";
      const author = book.bookAuthor?.toLowerCase() || "";

      const categoryName =
        typeof book.bookCategory === "object"
          ? book.bookCategory?.name?.toLowerCase()
          : "";

      return (
        title.includes(searchTerm) ||
        author.includes(searchTerm) ||
        categoryName.includes(searchTerm)
      );
    });
  }

  const sorted = [...filtered];

  switch (filter) {
    case "price-asc":
      sorted.sort((a, b) => Number(a.bookPrice) - Number(b.bookPrice));
      break;

    case "price-desc":
      sorted.sort((a, b) => Number(b.bookPrice) - Number(a.bookPrice));
      break;

    case "az":
      sorted.sort((a, b) =>
        (a.bookTitle || "").localeCompare(b.bookTitle || "")
      );
      break;

    case "za":
      sorted.sort((a, b) =>
        (b.bookTitle || "").localeCompare(a.bookTitle || "")
      );
      break;

    default:
      break;
  }

  return sorted;
}, [books, category, search, filter]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-linear-to-r from-emerald-400/10 to-emerald-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-linear-to-r from-blue-400/10 to-blue-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-linear-to-r from-purple-400/10 to-purple-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-4xl border border-emerald-400/20 bg-slate-950/50 shadow-[0_20px_60px_rgba(16,185,129,0.18)] backdrop-blur-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.26),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.22),transparent_35%)]" />
          <div className="relative grid gap-10 px-6 py-8 sm:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-16 lg:py-12">
            <div className="flex flex-col justify-center">
              <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                New Season Drop
              </span>
              <h1 className="max-w-xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Discover stories that change the way you think.
              </h1>
              <p className="mt-5 max-w-lg text-base text-slate-200 sm:text-lg">
                Shop bestselling fiction, business reads, and timeless classics curated for curious minds and everyday inspiration.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={scrollToBooks}
                  className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-emerald-400 to-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:scale-[1.02]"
                >
                  Shop Collection
                </button>
                <button
                  onClick={() => handlefavoritebook(featuredBook || books[0])}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/60 hover:bg-emerald-500/10"
                >
                  Save Featured Pick
                </button>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-200">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-2xl font-black text-emerald-300">20k+</p>
                  <p className="text-slate-300">Readers</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-2xl font-black text-emerald-300">1.4k</p>
                  <p className="text-slate-300">Book Picks</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-2xl font-black text-emerald-300">4.9/5</p>
                  <p className="text-slate-300">Customer Rating</p>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute -inset-4 rounded-4xl bg-emerald-500/10 blur-2xl" />
              <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/80 p-4 shadow-2xl shadow-black/25">
                {featuredBook ? (
                  <>
                    <div className="relative overflow-hidden rounded-3xl">
                      <img
                        src={featuredBook.image}
                        alt={featuredBook.bookTitle}
                        className="h-72 w-full object-cover sm:h-80"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/20 to-transparent" />
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                          Editor’s Pick
                        </p>
                        <h2 className="mt-2 text-2xl font-bold text-white">
                          {featuredBook.bookTitle}
                        </h2>
                        <p className="mt-1 text-sm text-slate-300">
                          by {featuredBook.bookAuthor}
                        </p>
                      </div>
                      <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-base font-bold text-emerald-300">
                        ${featuredBook.bookPrice}
                      </span>
                    </div>
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <button
                        onClick={() => handleCart(featuredBook)}
                        className="flex-1 rounded-full bg-linear-to-r from-emerald-400 to-emerald-500 px-4 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/30"
                      >
                        Buy Now
                      </button>
                      <button
                        onClick={() => handlefavoritebook(featuredBook)}
                        className="rounded-full border border-white/15 bg-white/5 p-3 text-white transition hover:border-emerald-400/50 hover:text-emerald-300"
                        aria-label="Add featured book to favorites"
                      >
                        <HeartIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex h-72 items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/5 text-slate-200">
                    New titles loading...
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <>
          <div className="mt-8">
            <Billboard books={books} />
          </div>
          {search && search.trim() && (
            <div className="mb-6 text-center">
              <p className="text-white/80 text-lg">
                {filteredBooks.length} result
                {filteredBooks.length !== 1 ? "s" : ""} for "{search}"
              </p>
            </div>
          )}
          <div id="books-grid" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBooks.length === 0 ? (
              <div className="col-span-full">
                <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-12 text-center border border-white/20">
                  <p className="text-white/80 text-xl">
                    {search && search.trim()
                      ? `No books found for "${search}"`
                      : "No books found"}
                  </p>
                  {search && search.trim() && (
                    <button
                      onClick={handleClearSearch}
                      className="mt-4 px-6 py-2 bg-emerald-500/20 text-emerald-300 rounded-xl hover:bg-emerald-500/30 transition-colors border border-emerald-500/30"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              </div>
            ) : (
              filteredBooks.map((book) => (
                <div
                  key={book._id}
                  className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 p-6 border border-white/20 hover:bg-white/15 hover:scale-105 group"
                >
                  <div className="relative overflow-hidden rounded-2xl mb-4">
                    <img
                      src={book.image}
                      alt={book.bookTitle}
                      className="w-full h-48 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
                    {book.bookTitle}
                  </h2>

                  <p className="text-white/70 mb-4 line-clamp-1">
                    by {book.bookAuthor}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-emerald-300">
                      ${book.bookPrice}
                    </span>
                    <HeartIcon
                      className="h-6 w-6 text-white/70 hover:text-emerald-300 transition-colors cursor-pointer"
                      onClick={() => handlefavoritebook(book)}
                    />
                    <button
                      className="bg-linear-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 backdrop-blur-sm border border-white/20"
                      onClick={() => handleCart(book)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      </div>
    </div>
  );
}
