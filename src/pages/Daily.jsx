import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import Calendar from '../components/Calendar';

export default function Daily() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-panel">
        <Navbar />
        <section className="content-page page-stack">
          <div className="page-headline">
            <h2>Daily Tasks</h2>
            <p>Stay focused on today’s priorities.</p>
          </div>

          <TodoForm />

          <div className="content-grid">
            <TodoList />
            <Calendar />
          </div>
        </section>
      </main>
    </div>
  );
}
