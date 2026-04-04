import React from "react";

const usercontext = React.createContext();

export default function Authcontext({ children }) {
  const [user, setUser] = React.useState([]);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [token, setToken] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  
  return (
    <div>
      <usercontext.Provider
        value={{ user, setUser, isAuthenticated, setIsAuthenticated, token, setToken }}
      >
        {children}
      </usercontext.Provider>
    </div>
  );
}
