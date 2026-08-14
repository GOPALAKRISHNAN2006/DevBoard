export default function StatCard({
  icon: Icon,
  label,
  value,
  tone = "indigo",
}) {
  return (
    <div className="stat-card card h-100">
      <div className={`stat-icon ${tone}`}>
        <Icon />
      </div>
      <div>
        <p>{label}</p>
        <h3>{value ?? 0}</h3>
      </div>
    </div>
  );
}
