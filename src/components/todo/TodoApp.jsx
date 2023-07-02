import "./TodoApp.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";
import { useState } from "react";

export default function TodoApp() {
  return (
    <div className="TodoApp">
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<LoginComponent />}></Route>
          <Route path="/login" element={<LoginComponent />}></Route>
          <Route
            path="/welcome/:userName"
            element={<WelcomeComponent />}
          ></Route>
          <Route path="/todos" element={<ListTodosComponent />}></Route>
          <Route path="/logout" element={<LogoutComponent />}></Route>
          <Route path="*" element={<ErrorComponent />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

function LoginComponent() {
  const [userName, setUserName] = useState("Onur Okyay");

  const [password, setPassword] = useState("");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const navigate = useNavigate();

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
    } else {
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

function WelcomeComponent() {
  const params = useParams();

  return (
    <div className="Welcome">
      <h1>Welcome {params.userName}</h1>
      <div>
        Manage Your Todos. <Link to="/todos">Go Here </Link>
      </div>
    </div>
  );
}

function ErrorComponent() {
  return (
    <div className="ErrorComponent">
      <h1>We are working really hard!</h1>
      <div>Apologies for the 404. Reach out team at ABC-DEF-GHIJ.</div>
    </div>
  );
}

function ListTodosComponent() {
  const today = new Date();
  const targetDate = new Date(
    today.getFullYear() + 12,
    today.getMonth(),
    today.getDay()
  );
  const todos = [
    { id: 1, description: "Learn AWS", done: false, targetDate: targetDate },
    {
      id: 2,
      description: "Learn Full Stack Dev",
      done: false,
      targetDate: targetDate,
    },
    { id: 3, description: "Learn DevOps", done: false, targetDate: targetDate },
  ];
  return (
    <div className="container">
      <h1>Things You Want To Do!</h1>
      <div>
        <table className="table">
          <thead>
            <tr>
              <td>ID</td>
              <td>Description</td>
              <td>Is Done?</td>
              <td>Target Date</td>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                <td>{todo.targetDate.toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HeaderComponent() {
  return (
    <header className="border-bottom border-light border-5 mb-5 p-2">
    <div className="container">
        <div className="row">
            <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="https://github.com/onurokkyay">onurokkyay</a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item fs-5"><Link className="nav-link" to="/welcome/onurokkyay">Home</Link></li>
                        <li className="nav-item fs-5"><Link className="nav-link" to="/todos">Todos</Link></li>
                    </ul>
                </div>
                <ul className="navbar-nav">
                    <li className="nav-item fs-5"><Link className="nav-link" to="/login">Login</Link></li>
                    <li className="nav-item fs-5"><Link className="nav-link" to="/logout">Logout</Link></li>
                </ul>
            </nav>
        </div>
    </div>
</header>

  )
}

function FooterComponent() {
  return (
    <footer className="footer">
      <div className="container">Your Footer</div>
    </footer>
  );
}

function LogoutComponent() {
  return (
    <div className="ErrorComponent">
      <h1>You are logged out!</h1>
      <div> Thank you for using our App. Come Back soon!</div>
    </div>
  );
}
