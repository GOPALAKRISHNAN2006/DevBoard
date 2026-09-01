import React from 'react';

export default function StatCard({
  icon: Icon,
  label,
  value,
  tone = "indigo",
  subtitle = "",
}) {
  const getToneClass = (t) => {
    switch (t) {
      case "blue":
        return "bg-primary-subtle text-primary border-primary";
      case "purple":
        return "bg-purple-subtle text-purple border-purple";
      case "orange":
        return "bg-warning-subtle text-warning border-warning";
      case "green":
        return "bg-success-subtle text-success border-success";
      case "dark":
        return "bg-dark-subtle text-dark border-dark";
      default:
        return "bg-primary-subtle text-primary border-primary";
    }
  };

  return (
    <div className="stat-card card h-100 shadow-sm border-0 bg-white p-3">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className={`p-2 rounded-3 d-flex align-items-center justify-content-center ${getToneClass(tone)}`}>
          <Icon size={20} />
        </div>
        {subtitle && <span className="extra-small text-muted fw-semibold">{subtitle}</span>}
      </div>
      <div>
        <p className="text-muted extra-small fw-semibold mb-1 text-uppercase tracking-wider">{label}</p>
        <h3 className="h4 fw-bold text-dark mb-0">{value ?? 0}</h3>
      </div>
    </div>
  );
}
