import { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const [userName, setUserName] = useState(null);

  function login(userName, password) {
    if (userName === "onurokkyay" && password === "dummy") {
      setAuthenticated(true);
      setUserName(userName);
      return true;
    } else {
      setAuthenticated(false);
      setUserName(null);
      return false;
    }
  }

  function logout() {
    setAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userName }}>
      {children}
    </AuthContext.Provider>
  );
}
