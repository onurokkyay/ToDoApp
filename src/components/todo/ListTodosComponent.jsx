import { useEffect, useState } from "react";
import {
  deleteTodoApi,
  retrieveAllTodosForUserNameApi,
} from "./api/TodoService";
import { useAuth } from "./security/AuthContext";

function ListTodosComponent() {
  const today = new Date();
  const targetDate = new Date(
    today.getFullYear() + 12,
    today.getMonth(),
    today.getDay()
  );

  const [todos, setTodos] = useState([]);

  const [message, setMessage] = useState(null);

  useEffect(() => refreshTodos(), []);

  const authContext = useAuth();

  const userName = authContext.userName;

  function refreshTodos() {
    retrieveAllTodosForUserNameApi(userName)
      .then((response) => setTodos(response.data))
      .catch((error) => console.log(error));
  }

  function deleteTodo(id) {
    console.log("clicked:" + id);
    deleteTodoApi(userName, id)
      .then(() => {
        setMessage(`Delete of todo with id:${id} succesful`);
        refreshTodos();
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="container">
      <h1>Things You Want To Do!</h1>
      {message && <div className="alert alert-warning">{message}</div>}
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Is Done?</th>
              <th>Target Date</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                <td>{todo.targetDate}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListTodosComponent;
