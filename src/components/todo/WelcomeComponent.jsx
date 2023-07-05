import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { retrieveAllTodosForUserName } from "./api/TodoService";
function WelcomeComponent() {
  const { userName } = useParams();

  const [message, setMessage] = useState(null);

  function callHelloWorld() {
    console.log("called" + userName);

    retrieveAllTodosForUserName(userName)
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("cleanup"));
  }

  function successfulResponse(response) {
    //setMessage(response.data.message);
    console.log(response);
  }

  function errorResponse(error) {
    console.log(error);
  }

  return (
    <div className="Welcome">
      <h1>Welcome {userName}</h1>
      <div>
        Manage Your Todos. <Link to="/todos">Go Here </Link>
      </div>
      <button className="btn btn-success m-5" onClick={callHelloWorld}>
        Call Hello World
      </button>
      <div className="text-info">{message}</div>
    </div>
  );
}

export default WelcomeComponent;
