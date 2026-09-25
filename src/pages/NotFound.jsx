import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function NotFound() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-panel">
        <Navbar />
        <section className="content-page not-found">
          <h2>404</h2>
          <p>Page not found.</p>
        </section>
      </main>
    </div>
  );
}
