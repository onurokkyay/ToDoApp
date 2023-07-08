import { createContext, useState, useContext } from "react";
import { executeBasicAuthenticationService } from "../api/TodoService";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const [userName, setUserName] = useState(null);

  function login(userName, password) {
    const basicAuthToken = "Basic " + window.btoa(userName + ":" + password);
    executeBasicAuthenticationService(basicAuthToken)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    setAuthenticated(false);

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
