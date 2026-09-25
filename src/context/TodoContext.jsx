import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const formatDateKey = (date) => {
  const safeDate = date instanceof Date ? date : new Date(date);
  const year = safeDate.getFullYear();
  const month = String(safeDate.getMonth() + 1).padStart(2, '0');
  const day = String(safeDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const STORAGE_KEY = 'todo-flow-state';
const DEMO_DATE = '2026-10-25';
const defaultSelectedDate = formatDateKey(new Date());

const getInitialState = () => {
  const fallbackState = {
    selectedDate: defaultSelectedDate,
    todos: {
      [defaultSelectedDate]: [],
    },
  };

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return fallbackState;
    }

    const parsed = JSON.parse(saved);

    if (!parsed || typeof parsed !== 'object') {
      return fallbackState;
    }

    if (parsed.selectedDate === DEMO_DATE) {
      return fallbackState;
    }

    return {
      selectedDate: parsed.selectedDate || defaultSelectedDate,
      todos: parsed.todos || {
        [defaultSelectedDate]: [],
      },
    };
  } catch {
    return fallbackState;
  }
};

const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  const initialState = useMemo(() => getInitialState(), []);
  const [selectedDate, setSelectedDate] = useState(initialState.selectedDate);
  const [todos, setTodos] = useState(initialState.todos);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        selectedDate,
        todos,
      }),
    );
  }, [selectedDate, todos]);

  const addTodo = (title, dateKey = selectedDate) => {
    setTodos((currentTodos) => ({
      ...currentTodos,
      [dateKey]: [...(currentTodos[dateKey] ?? []), { id: Date.now(), title, completed: false }],
    }));
  };

  const toggleTodo = (id, dateKey = selectedDate) => {
    setTodos((currentTodos) => ({
      ...currentTodos,
      [dateKey]: (currentTodos[dateKey] ?? []).map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    }));
  };

  const removeTodo = (id, dateKey = selectedDate) => {
    setTodos((currentTodos) => ({
      ...currentTodos,
      [dateKey]: (currentTodos[dateKey] ?? []).filter((todo) => todo.id !== id),
    }));
  };

  const value = useMemo(
    () => ({
      todos,
      selectedDate,
      setSelectedDate,
      addTodo,
      toggleTodo,
      removeTodo,
    }),
    [selectedDate, todos],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodos must be used inside a TodoProvider');
  }

  return context;
}
