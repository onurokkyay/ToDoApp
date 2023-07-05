import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

export const retrieveAllTodosForUserNameApi = (userName) =>
  apiClient.get(`/users/${userName}/todos`);

export const deleteTodoApi = (userName, id) =>
  apiClient.delete(`/users/${userName}/todos/${id}`);
