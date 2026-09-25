export default function DashboardCard({ title, value, tone = 'neutral' }) {
  return (
    <article className={`dashboard-card ${tone}`}>
      <p>{title}</p>
      <strong>{value}</strong>
    </article>
  );
}
