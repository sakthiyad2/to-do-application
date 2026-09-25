import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useTodos } from '../context/TodoContext';

const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function Weekly() {
  const { todos, selectedDate } = useTodos();
  const selected = new Date(`${selectedDate}T00:00:00`);
  const startOfWeek = new Date(selected);
  const day = startOfWeek.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  startOfWeek.setDate(startOfWeek.getDate() + diff);

  const weekDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);

    return {
      date,
      key: formatDateKey(date),
      label: date.toLocaleDateString('en-US', { weekday: 'long' }),
      short: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      tasks: todos[formatDateKey(date)] ?? [],
    };
  });

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-panel">
        <Navbar />
        <section className="content-page page-stack">
          <div className="page-headline">
            <h2>Weekly overview</h2>
            <p>Review your tasks across the current week.</p>
          </div>

          <div className="weekly-grid">
            {weekDays.map(({ label, short, tasks, key }) => (
              <div key={key} className="weekly-day-block">
                <div className="weekly-day-header">
                  <strong>{label}</strong>
                  <span>{short}</span>
                </div>

                {tasks.length === 0 ? (
                  <p className="weekly-empty">No tasks</p>
                ) : (
                  <ul className="weekly-task-list">
                    {tasks.map((task) => (
                      <li key={task.id} className={task.completed ? 'done' : ''}>
                        {task.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
