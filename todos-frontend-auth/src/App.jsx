import { useState, useEffect } from "react";
import todoService from "./services/todos";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import GreetingLogout from "./components/GreetingLogout";
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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserObject(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setNotification({ message: "Login Successfull", type: "info" });
      setUserObject(user);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      setNotification({ message: "Invalid Credentials", type: "warning" });
    }
    setTimeout(() => {
      setNotification(null);
    }, 3000);
    setUsername("");
    setPassword("");
  };

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
      setTodos([...todos, createdTodo]);
    } catch (error) {
      setNotification({ message: "Add Failed", type: "warning" });
    }
    setTask("");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserObject(null);
  };

  return (
    <div>
      <h2>Todo App</h2>
      <Notification notification={notification} />
      {userObject && (
        <GreetingLogout userObject={userObject} handleLogout={handleLogout} />
      )}
      {userObject ? (
        <TodoForm handleTodo={handleTodo} task={task} setTask={setTask} />
      ) : (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
