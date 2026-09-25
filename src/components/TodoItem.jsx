import { useTodos } from '../context/TodoContext';

export default function TodoItem({ todo }) {
  const { toggleTodo, removeTodo, selectedDate } = useTodos();

  return (
    <li className={`todo-item ${todo.completed ? 'done' : ''}`}>
      <label className="todo-check">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id, selectedDate)}
        />
        <span>{todo.title}</span>
      </label>

      <button type="button" className="delete-btn" onClick={() => removeTodo(todo.id, selectedDate)}>
        Delete
      </button>
    </li>
  );
}
