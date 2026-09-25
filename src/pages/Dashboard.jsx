import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import DashboardCard from '../components/DashboardCard';
import { useTodos } from '../context/TodoContext';

export default function Dashboard() {
  const { todos, selectedDate } = useTodos();
  const allTasks = Object.values(todos).flat();
  const completed = allTasks.filter((todo) => todo.completed).length;
  const pending = allTasks.filter((todo) => !todo.completed).length;
  const focus = (todos[selectedDate] ?? []).length;

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-panel">
        <Navbar />
        <section className="content-page">
          <h2>Dashboard</h2>
          <div className="stats-grid">
            <DashboardCard title="Completed" value={String(completed)} tone="success" />
            <DashboardCard title="Pending" value={String(pending)} tone="warning" />
            <DashboardCard title="Focus" value={String(focus)} tone="info" />
          </div>
        </section>
      </main>
    </div>
  );
}
