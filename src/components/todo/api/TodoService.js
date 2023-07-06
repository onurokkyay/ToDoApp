import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

export const retrieveAllTodosForUserNameApi = (userName) =>
  apiClient.get(`/users/${userName}/todos`);

export const retrieveTodoByIdApi = (userName, id) =>
  apiClient.get(`/users/${userName}/todos/${id}`);

export const deleteTodoApi = (userName, id) =>
  apiClient.delete(`/users/${userName}/todos/${id}`);
