import { useState, useEffect } from "react";
import Todo from "./components/Todo";
import todoService from "./services/todos";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    todoService.getTodos().then((todos) => setTodos(todos));
  }, []);

  return (
    <div>
      <h3>Todo List</h3>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default App;
