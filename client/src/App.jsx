import React, { useState } from "react";
import Navbar from "./component/Navbar";
import LoginForm from "./component/LoginForm";
import Home from "./component/Home";
import { Route, Routes } from "react-router-dom";
import Update_books from "./component/Update_books";
import Shophub_cart from "./component/Shophub_cart";
import Signup from "./component/Signup";
import ProtectedRoute from "./routes/ProtectedRoutes";
import AdminRoute from "./routes/AdminRoute";
import OrderCart from "./component/OrderCart";
import BookContext from "./component/BookContext";

const App = () => {
  const [showlogin, setShowLogin] = useState(false);
  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <AdminRoute>
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              </AdminRoute>
            </>
          }
        ></Route>
        <Route
          path="/Login"
          element={<LoginForm onClose={() => setShowLogin(false)} />}
        ></Route>
        
        <Route path="/ordercart" element={<><ProtectedRoute><OrderCart /></ProtectedRoute></>}></Route>
        
        <Route
          path="/updateBook"
          element={
            <>
            <AdminRoute>
              <ProtectedRoute>
                <Update_books />
              </ProtectedRoute>
              </AdminRoute>
            </>
          }
        ></Route>
        <Route path="/signup" element={<Signup />}></Route>
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
