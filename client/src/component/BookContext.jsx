import React, { createContext } from 'react'

export const Bookcontext = createContext();
export default function BookContext({ children }) {
  const [selectedBook, setSelectedBook] = React.useState(null);
  const [books, setBooks] = React.useState([]);

  return (
    <Bookcontext.Provider value={{ selectedBook, setSelectedBook, books, setBooks }}>
      {children}
    </Bookcontext.Provider>
  );
}
