import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./security/AuthContext";
function LoginComponent() {
  const [userName, setUserName] = useState("Onur Okyay");

  const [password, setPassword] = useState("");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const navigate = useNavigate();

  const authContext = useAuth();

  function handleUserNameChange(event) {
    setUserName(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit() {
    if (userName === "Onur Okyay" && password === "dummy") {
      console.log("Success");
      setShowSuccessMessage(true);
      setShowErrorMessage(false);
      navigate(`/welcome/${userName}`);
      authContext.setAuthenticated(true);
    } else {
      authContext.setAuthenticated(false);
      console.log("Failed");
      setShowSuccessMessage(false);
      setShowErrorMessage(true);
    }
  }

  return (
    <div className="Login">
      <h1>Time to login!</h1>
      {showSuccessMessage && (
        <div className="successMessage">Authenticated Successfully</div>
      )}
      {showErrorMessage && (
        <div className="errorMessage">
          Authentication Failed. Please check your credentials.
        </div>
      )}
      <div className="LoginForm">
        <div>
          <label>User Name</label>
          <input
            type="text"
            name="username"
            value={userName}
            onChange={handleUserNameChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button type="button" name="login" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
