import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  
  const user =JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      return navigate("/Login");
    }

    try {
      
      if (user.role !== "Admin") {
        return navigate("/shopping");
      }
    } catch (error) {
      console.error("Failed to parse user data", error);
      return navigate("/Login");
    }
  },[]);

  return children;
};

export default AdminRoute;
