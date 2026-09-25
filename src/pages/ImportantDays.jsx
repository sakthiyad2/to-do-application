import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Calendar from '../components/Calendar';
import TodoList from '../components/TodoList';

export default function ImportantDays() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-panel">
        <Navbar />
        <section className="content-page page-stack">
          <div className="page-headline">
            <h2>Important Days</h2>
            <p>Track deadlines, milestones, and key dates.</p>
          </div>

          <div className="content-grid important-layout">
            <Calendar />
            <TodoList />
          </div>
        </section>
      </main>
    </div>
  );
}
