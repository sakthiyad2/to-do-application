import { useTodos } from '../context/TodoContext';

const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export default function Calendar() {
  const { todos, selectedDate, setSelectedDate } = useTodos();
  const selected = new Date(`${selectedDate}T00:00:00`);
  const monthDate = new Date(selected.getFullYear(), selected.getMonth(), 1);
  const monthLabel = monthDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const startOffset = (monthDate.getDay() + 6) % 7;
  const calendarStart = new Date(monthDate);
  calendarStart.setDate(1 - startOffset);

  const days = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(calendarStart);
    date.setDate(calendarStart.getDate() + index);

    return {
      key: formatDateKey(date),
      dayNumber: date.getDate(),
      isCurrentMonth: date.getMonth() === monthDate.getMonth(),
      isSelected: formatDateKey(date) === selectedDate,
    };
  });

  return (
    <section className="calendar-panel">
      <div className="panel-header">
        <h2>Calendar</h2>
        <span>{monthLabel}</span>
      </div>

      <div className="calendar-grid">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div key={day} className="day-label">
            {day}
          </div>
        ))}

        {days.map(({ key, dayNumber, isCurrentMonth, isSelected }) => {
          const taskCount = todos[key]?.length ?? 0;

          return (
            <button
              key={key}
              type="button"
              className={`day-cell ${isCurrentMonth ? 'in-month' : 'out-month'} ${
                isSelected ? 'selected' : ''
              }`}
              onClick={() => setSelectedDate(key)}
            >
              <span>{dayNumber}</span>
              {taskCount > 0 && <small>{taskCount}</small>}
            </button>
          );
        })}
      </div>
    </section>
  );
}
