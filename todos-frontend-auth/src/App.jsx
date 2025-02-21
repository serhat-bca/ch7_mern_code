import { useState, useEffect } from "react";
import Todo from "./components/Todo";
import todoService from "./services/todos";
import loginService from "./services/login";
import Notification from "./components/Notification";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);

  const [task, setTask] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [userObject, setUserObject] = useState(null);

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    todoService.getTodos().then((todos) => setTodos(todos));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setNotification({ message: "Login Successfull", type: "info" });
      setUserObject(user);
      console.log("Login Successfull");
      console.log(user);
    } catch (error) {
      setNotification({ message: "Invalid Credentials", type: "warning" });
    }
    setTimeout(() => {
      setNotification(null);
    }, 3000);
    setUsername("");
    setPassword("");
  };

  const loginForm = () => (
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
  );

  const todoForm = () => (
    <form onSubmit={handleTodo}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">Add to the list</button>
    </form>
  );

  const handleTodo = async (event) => {
    event.preventDefault();
    console.log(task);
    const todo = { task, done: false };
    try {
      const createdTodo = await todoService.addTodo(todo, userObject.token);
      setNotification({
        message: `${createdTodo.task} is added`,
        type: "info",
      });
    } catch (error) {
      setNotification({ message: "Add Failed", type: "warning" });
    }
    setTask("");
  };

  return (
    <div>
      <h2>Todo App</h2>
      <Notification notification={notification} />
      {userObject && <em>Howdy, {userObject.username}!</em>}
      {userObject ? todoForm() : loginForm()}
      <h3>Todo List</h3>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default App;
