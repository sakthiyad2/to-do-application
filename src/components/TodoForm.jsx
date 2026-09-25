import { useState } from 'react';
import { useTodos } from '../context/TodoContext';

export default function TodoForm() {
  const { addTodo, selectedDate } = useTodos();
  const [title, setTitle] = useState('');

  const formattedDate = new Date(`${selectedDate}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    addTodo(trimmedTitle, selectedDate);
    setTitle('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label htmlFor="todo-title" className="sr-only">
        Add a new task
      </label>
      <input
        id="todo-title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder={`Add task for ${formattedDate}`}
      />
      <button type="submit">Add task</button>
    </form>
  );
}
