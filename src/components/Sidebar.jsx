import { NavLink } from 'react-router-dom';

const items = [
  { label: 'Home', to: '/' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Daily', to: '/daily' },
  { label: 'Weekly', to: '/weekly' },
  { label: 'Important Days', to: '/important-days' },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">✓</span>
        <strong>TodoFlow</strong>
      </div>

      <ul className="sidebar-menu">
        {items.map(({ label, to }) => (
          <li key={label}>
            <NavLink
              to={to}
              className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
