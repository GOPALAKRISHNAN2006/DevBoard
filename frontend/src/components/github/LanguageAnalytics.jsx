import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const LanguageAnalytics = ({ languages = [] }) => {
  if (!languages || languages.length === 0) {
    return (
      <div className="card shadow-sm border-0 bg-white p-4 mb-4">
        <h3 className="h6 fw-bold text-dark text-uppercase mb-3">Language Analytics</h3>
        <p className="text-muted small mb-0">No language data detected in public repositories.</p>
      </div>
    );
  }

  const topLanguages = languages.slice(0, 5);
  const labels = topLanguages.map((l) => l.language);
  const dataValues = topLanguages.map((l) => l.count);

  const chartData = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          '#0a66c2',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { boxWidth: 12, font: { size: 11 } },
      },
    },
  };

  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <h3 className="h6 fw-bold text-dark text-uppercase mb-3">Language Analytics</h3>

      <div className="row align-items-center g-4">
        <div className="col-12 col-md-6" style={{ height: '200px' }}>
          <Doughnut data={chartData} options={chartOptions} />
        </div>

        <div className="col-12 col-md-6">
          <div className="d-flex flex-column gap-3">
            {languages.slice(0, 5).map((lang, idx) => (
              <div key={idx}>
                <div className="d-flex justify-content-between small mb-1 fw-semibold">
                  <span className="text-dark">{lang.language}</span>
                  <span className="text-muted">{lang.count} repos ({lang.percentage}%)</span>
                </div>
                <div className="progress" style={{ height: '6px' }}>
                  <div
                    className="progress-bar bg-primary"
                    style={{ width: `${lang.percentage}%` }}
                    aria-valuenow={lang.percentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageAnalytics;
