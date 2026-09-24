import { useContext } from "react";
import { Navigate } from "react-router-dom";
 const ProtectedRoute = ({ children }) => {
 
 const role=localStorage.getItem("user");

 
  if (role !== "User" && role !== "Admin") {
    return <Navigate to="/Login" />;
  }

  return children;
};
export default ProtectedRoute;