import React, { useState } from "react";
import Navbar from "./component/Navbar";
import LoginForm from "./component/LoginForm";
import Home from "./component/Home";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      <Navbar onLoginClick={() => setShowLogin(true)} />
      {showLogin ? (
        <LoginForm onClose={() => setShowLogin(false)} />
      ) : (
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to ShopHub
          </h1>
          <p className="text-gray-600 mt-2">
            Click the user icon in navbar to login
          </p>
        </div>
      )}

    <Home/>
    </div>
  );
};

export default App;
