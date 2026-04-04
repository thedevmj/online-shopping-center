import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Usercontext } from "../context/Authcontext";

const AdminRoute = ({ children }) => {
  
  const { user } = useContext(Usercontext);
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
  }, [user, navigate]);

  return children;
};

export default AdminRoute;
