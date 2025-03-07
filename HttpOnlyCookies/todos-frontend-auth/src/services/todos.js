import axios from "axios";
const API_URL = "/api/todos/";

const getTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const addTodo = async (todo, token) => {
  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, todo, authorization);
  return response.data;
};

export default { getTodos, addTodo };
