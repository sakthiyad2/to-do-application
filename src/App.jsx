import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { TodoProvider } from './context/TodoContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Daily from './pages/Daily';
import Weekly from './pages/Weekly';
import ImportantDays from './pages/ImportantDays';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <TodoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/daily" element={<Daily />} />
          <Route path="/weekly" element={<Weekly />} />
          <Route path="/important-days" element={<ImportantDays />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </TodoProvider>
  );
}

export default App;
