import React, { useState } from "react";
import Navbar from "./component/Navbar";
import LoginForm from "./component/LoginForm";
import Home from "./component/Home";
import { Route, Routes } from "react-router-dom";
import Update_books from "./component/Update_books";
import Shophub_cart from "./component/Shophub_cart";
import Signup from "./component/Signup";
import ProtectedRoute from "./routes/ProtectedRoutes";
import AuthRoute from "./routes/AuthRoute";
import AdminRoute from "./routes/AdminRoute";
import OrderCart from "./component/OrderCart";
import BookContext from "./component/BookContext";
import Allusercarts from "./component/Allusercarts";
import Logout from "./component/Logout";
import Userdashboard from "./component/Userdashboard";
import Favorites from "./component/Favorites";
import Orders from "./component/Orders";
import Admindashboard from "./component/Admindashboard";


const App = () => {
  const [showlogin, setShowLogin] = useState(false);
  const [category, selectedCategory] = useState("");
  const [filter, setfilter] = useState("");
 const [search, setsearch] = useState("");
 

  return (
    <div>
      <Navbar selectedCategory={selectedCategory} setfilter={setfilter} setsearch={setsearch} />
      
      <Routes>
        <Route path="/Logout" element={<Logout />}></Route>
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
        <Route path="/admindashboard" element={<><AdminRoute><ProtectedRoute><Admindashboard /></ProtectedRoute></AdminRoute></>} />
        <Route
          path="/Login"
          element={
            <>
              <AuthRoute>
                <LoginForm onClose={() => setShowLogin(false)} />
              </AuthRoute>
            </>
          }
        ></Route>

        <Route
          path="/ordercart"
          element={
            <>
              <ProtectedRoute>
                <OrderCart />
              </ProtectedRoute>
            </>
          }
        ></Route>

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
        <Route path="/favorites" element={<><ProtectedRoute><Favorites /></ProtectedRoute></>} />
        <Route path="/signup" element={
          <AuthRoute>
            <Signup />
          </AuthRoute>
        }></Route>
        <Route path="/orders" element={<><ProtectedRoute><Orders/></ProtectedRoute></>} />
        <Route
          path="/allcarts"
          element={
            <>
              <ProtectedRoute>
                <Allusercarts />
              </ProtectedRoute>
            </>
          }
        ></Route>
        <Route path="/userdashboard" element={<Userdashboard />} />
        <Route
          path="/shopping"
          element={
            <>
              <ProtectedRoute>
                <Shophub_cart category={category} filter={filter} search={search || ""} setsearch={setsearch} />
              </ProtectedRoute>
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
