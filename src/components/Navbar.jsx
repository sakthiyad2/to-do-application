import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Overview', to: '/' },
  { label: 'Today', to: '/daily' },
  { label: 'Weekly', to: '/weekly' },
  { label: 'Important', to: '/important-days' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      const clickedInsideMenu = menuRef.current?.contains(event.target);
      const clickedButton = buttonRef.current?.contains(event.target);

      if (!clickedInsideMenu && !clickedButton) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <header className="navbar">
        <div className="navbar-brand">
          <div className="brand-mark small">✓</div>
          <div>
            <p className="eyebrow">Planning board</p>
            <h1>My To-Do Dashboard</h1>
          </div>
        </div>

        <button
          ref={buttonRef}
          type="button"
          className="mobile-menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          ☰
        </button>

        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map(({ label, to }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      {menuOpen && <button type="button" className="mobile-menu-backdrop" onClick={() => setMenuOpen(false)} aria-label="Close navigation" />}

      <nav
        ref={menuRef}
        className={`mobile-nav-panel ${menuOpen ? 'open' : ''}`}
        aria-label="Mobile navigation"
        role="menu"
      >
        {navItems.map(({ label, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
