import React, { useState } from "react";
import Navbar from "./component/Navbar";
import LoginForm from "./component/LoginForm";
import Home from "./component/AdminHome";
import { Route, Routes } from "react-router-dom";
import Update_books from "./component/Update_books";
import Shophub_cart from "./component/Shophub_cart";
import Signup from "./component/Signup";
import ProtectedRoute from "./routes/ProtectedRoutes";
import AdminRoute from "./routes/AdminRoute";
import OrderCart from "./component/OrderCart";
import BookContext from "./component/BookContext";
import Allusercarts from "./component/Allusercarts";
import Logout from "./component/Logout";
import Userdashboard from "./component/Userdashboard";
import Favorites from "./component/Favorites";
import Orders from "./component/UserOrders";
import Admindashboard from "./component/Admindashboard";
import UserOrders from "./component/UserOrders";
import viewOrder from "./component/Vieworder";
import ViewOrder from "./component/Vieworder";

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
                
                  <Home />
               
              </AdminRoute>
            </>
          }
        ></Route>
        <Route path="/admindashboard" element={<><AdminRoute><Admindashboard category={category} search={search} /></AdminRoute></>} />
        <Route
          path="/Login"
          element={
            <>
             
                <LoginForm onClose={() => setShowLogin(false)} />
              
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
         <Route path="/vieworder" element={<><ProtectedRoute><ViewOrder></ViewOrder></ProtectedRoute></>}>

         </Route>
        <Route
          path="/updateBook"
          element={
            <>
              <AdminRoute>
                
                  <Update_books />
               
              </AdminRoute>
            </>
          }
        ></Route>
        <Route path="/favorites" element={<><ProtectedRoute><Favorites /></ProtectedRoute></>} />
        <Route path="/signup" element={
          
            <Signup />
          
        }></Route>
        <Route path="/orders" element={<><ProtectedRoute><UserOrders/></ProtectedRoute></>} />
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
                <Shophub_cart category={category||""} filter={filter} search={search || ""} setsearch={setsearch} />
              </ProtectedRoute>
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
