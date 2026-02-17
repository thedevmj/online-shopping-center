import React, { useState } from "react";
import Navbar from "./component/Navbar";
import LoginForm from "./component/LoginForm";
import Home from "./component/Home";
import { Route, Routes } from "react-router-dom";
import Update_books from "./component/Update_books";
import Shophub_cart from "./component/Shophub_cart";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      <Navbar onLoginClick={() => setShowLogin(true)} />
      {showLogin ? (
        <LoginForm onClose={() => setShowLogin(false)} />
      ) : (
        <div className="p-8 text-center"></div>
      )}

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/updateBook" element={<Update_books />}></Route>
        <Route
          path="/shopping"
          element={
            <>
              <Shophub_cart />
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
