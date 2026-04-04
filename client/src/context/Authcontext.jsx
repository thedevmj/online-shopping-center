import React, { createContext, useState } from "react";

export const Usercontext = createContext();

export default function Authcontext({ children }) {
  const [user, setUser] = useState({}||null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  
  return (
    <div>
      <Usercontext.Provider
        value={{ user, setUser, isAuthenticated, setIsAuthenticated, token, setToken }}
      >
        {children}
      </Usercontext.Provider>
    </div>
  );
}
