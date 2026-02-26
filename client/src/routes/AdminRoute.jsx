import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      return navigate("/Login");
    }

    if (user.role !== "Admin") {
      return navigate("/");
    }
  },[]);

  return children;
};

export default AdminRoute;
