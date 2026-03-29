import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If user is already logged in, redirect to shopping page
  if (token) {
    return <Navigate to="/shopping" />;
  }

  // If user is not logged in, show the login page
  return children;
};

export default AuthRoute;
