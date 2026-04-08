import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";


const AdminRoute = ({ children }) => {
  
  const role=localStorage.getItem("user");
  const navigate = useNavigate();
  
  
  
    
 useEffect(() => {
   
    
  if (!role) {
      
      return navigate("/Login")
             
    
    }
    
    

    try {
      
      if (role === "User") {
        return navigate("/shopping");
      }
      
    } catch (error) {
      console.error("Failed to parse user data", error);
      return navigate("/Login");
    }
  }, []);

  return children;
};

export default AdminRoute;
