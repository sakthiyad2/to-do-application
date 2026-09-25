import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import DashboardCard from '../components/DashboardCard';
import Calendar from '../components/Calendar';
import { useTodos } from '../context/TodoContext';

export default function Home() {
  const { todos, selectedDate } = useTodos();
  const selectedTodos = todos[selectedDate] ?? [];
  const completed = selectedTodos.filter((todo) => todo.completed).length;
  const pending = selectedTodos.length - completed;

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-panel">
        <Navbar />

        <section className="welcome-panel">
          <div>
            <p className="welcome-kicker">Your focus</p>
            <h2>Organize your day. Stay productive.</h2>
          </div>

          <div className="welcome-actions">
            <Link to="/dashboard" className="primary-cta">
              Go to Dashboard
            </Link>
            <Link to="/daily" className="secondary-cta">
              View Today’s Tasks
            </Link>
          </div>
        </section>

        <section className="stats-row">
          <DashboardCard title="Completed" value={String(completed)} tone="success" />
          <DashboardCard title="Pending" value={String(pending)} tone="warning" />
          <DashboardCard
            title="Selected day"
            value={new Date(`${selectedDate}T00:00:00`).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
            tone="info"
          />
        </section>

        <TodoForm />
        <div className="content-grid">
          <TodoList />
          <Calendar />
        </div>
      </main>
    </div>
  );
}
