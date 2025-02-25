import Todo from "./Todo";

const TodoList = ({ todos }) => {
  return (
    <div>
      <h3>Todo List</h3>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
