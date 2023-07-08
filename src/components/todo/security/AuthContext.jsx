import { createContext, useState, useContext } from "react";
import { executeBasicAuthenticationService } from "../api/TodoService";
import { apiClient } from "../api/ApiClient";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const [userName, setUserName] = useState(null);

  const [token, setToken] = useState(null);

  async function login(userName, password) {
    const basicAuthToken = "Basic " + window.btoa(userName + ":" + password);
    try {
      const response = await executeBasicAuthenticationService();

      if (response.status == 200) {
        setAuthenticated(true);
        setUserName(userName);
        setToken(basicAuthToken);
        apiClient.interceptors.request.use(
          config => {
            config.headers.Authorization=basicAuthToken
          }
        )
        return true;
      } else {
        console.log("authfalse");
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }

  function logout() {
    setAuthenticated(false);
    setUserName(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, userName, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
