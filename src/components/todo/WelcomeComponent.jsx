import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { retrieveAllTodosForUserNameApi } from "./api/TodoService";
function WelcomeComponent() {
  const { userName } = useParams();

  return (
    <div className="Welcome">
      <h1>Welcome {userName}</h1>
      <div>
        Manage Your Todos. <Link to="/todos">Go Here </Link>
      </div>
    </div>
  );
}

export default WelcomeComponent;
