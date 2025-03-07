const Todo = ({ todo }) => {
  return (
    <div>
      {todo.task}. done: {todo.done ? "yes" : "no"}
    </div>
  );
};

export default Todo;
