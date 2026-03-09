import React, { createContext } from 'react'

 export const Bookcontext=createContext();
export default function BookContext({children}) {

  const [selectedBook, setSelectedBook] = React.useState(null);
    return (
    <div>
    <Bookcontext.Provider value={{selectedBook, setSelectedBook}}> 
        {children}
    </Bookcontext.Provider>
    </div>
  )
}
