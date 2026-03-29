import React, { useState, useEffect } from "react";
import "../styles/Billboard.css";

export default function Billboard({ books }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  
  useEffect(() => {
    if (!books || books.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % books.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [books]);

  if (!books || books.length === 0) {
    return <div className="billboard-container">No books available</div>;
  }

  const currentBook = books[currentIndex];

  
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + books.length) % books.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % books.length);
  };

  return (
    <div className="billboard-container">
      <div className="billboard-wrapper">
        <img
          src={currentBook.image}
          alt={currentBook.bookname || "Book"}
          className="billboard-image"
        />
        
        
        <div className="billboard-info">
          <h2>{currentBook.bookname}</h2>
          <p className="author">by {currentBook.bookAuthor}</p>
          <p className="price">${currentBook.bookPrice}</p>
        </div>

        
        <button className="billboard-btn prev" onClick={handlePrev}>
          ❮
        </button>
        <button className="billboard-btn next" onClick={handleNext}>
          ❯
        </button>

        
        <div className="billboard-dots">
          {books.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            >
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
