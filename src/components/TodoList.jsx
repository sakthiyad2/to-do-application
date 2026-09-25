import { useTodos } from '../context/TodoContext';
import TodoItem from './TodoItem';

export default function TodoList() {
  const { todos, selectedDate } = useTodos();
  const selectedTodos = todos[selectedDate] ?? [];
  const label = new Date(`${selectedDate}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <section className="todo-list-panel">
      <div className="panel-header">
        <h2>Tasks</h2>
        <span>
          {label} · {selectedTodos.length} items
        </span>
      </div>

      {selectedTodos.length === 0 ? (
        <p className="empty-state">No tasks for this day. Add one to get started.</p>
      ) : (
        <ul className="todo-list">
          {selectedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </section>
  );
}
