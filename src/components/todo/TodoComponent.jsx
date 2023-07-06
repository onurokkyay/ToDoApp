import { useParams } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { retrieveTodoByIdApi } from "./api/TodoService";

export default function TodoComponent() {
    
  const authContext = useAuth();

  const userName = authContext.userName;

  const { id } = useParams();

  useEffect(() => retrieveTodo(), [id]);

  const [description, setDescription] = useState("");

  function retrieveTodo() {
    retrieveTodoByIdApi(userName, id)
      .then((response) => {
        setDescription(response.data.description);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="container">
      <h1>Todo Details</h1>
      <div>Description: {description}</div>
    </div>
  );
}
