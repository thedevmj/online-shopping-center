import React, { useState } from "react";
import Navbar from "./component/Navbar";
import LoginForm from "./component/LoginForm";
import Home from "./component/Home";
import { Route, Routes } from "react-router-dom";
import Update_books from "./component/Update_books";
import Shophub_cart from "./component/Shophub_cart";
import Signup from "./component/Signup";
import ProtectedRoute from "./routes/ProtectedRoutes";

const App = () => {
 
 const [showlogin,setShowLogin]=useState(false);
  return (
    <div>
      <Navbar />   
     
      <Routes>
        <Route path="/" element={
         <><ProtectedRoute>
         <Home />
         </ProtectedRoute>
          </>
          }></Route>
         <Route
          path="/Login"
          element={<LoginForm onClose={() => setShowLogin(false)} />}
        ></Route>
        <Route path="/updateBook" element={<> 
        <ProtectedRoute>
        <Update_books />
        </ProtectedRoute>
        </>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route
          path="/shopping"
          element={
            <>
            <ProtectedRoute>
              <Shophub_cart />
              </ProtectedRoute>
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
