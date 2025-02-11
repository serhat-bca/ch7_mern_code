import { useState, useEffect } from "react";
import Todo from "./components/Todo";
import todoService from "./services/todos";
import loginService from "./services/login";

const App = () => {
  const [todos, setTodos] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [userObject, setUserObject] = useState(null);

  useEffect(() => {
    todoService.getTodos().then((todos) => setTodos(todos));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUserObject(user);
      console.log("Login Successfull");
      console.log(user);
    } catch (error) {
      console.log("Invalid Credentials", error);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h2>Todo App</h2>
      <form onSubmit={handleLogin}>
        <div>
          username{" "}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      <h3>Todo List</h3>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default App;
