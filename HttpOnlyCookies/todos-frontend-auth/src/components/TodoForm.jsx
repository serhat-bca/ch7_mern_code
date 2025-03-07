const TodoForm = ({ handleTodo, task, setTask }) => {
  return (
    <form onSubmit={handleTodo}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">Add to the list</button>
    </form>
  );
};

export default TodoForm;
