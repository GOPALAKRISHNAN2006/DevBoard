import React from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';

const RepositorySearchFilterSort = ({
  searchQuery,
  onSearchChange,
  selectedLanguage,
  onLanguageChange,
  sortBy,
  onSortChange,
  availableLanguages = [],
}) => {
  return (
    <div className="card shadow-sm border-0 bg-white p-4 mb-4">
      <div className="row g-3 align-items-center">
        {/* Search */}
        <div className="col-12 col-md-5">
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-light border-end-0">
              <FiSearch className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control form-control-sm border-start-0"
              placeholder="Search repositories by name or description..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* Language Filter */}
        <div className="col-12 col-sm-6 col-md-4">
          <div className="d-flex align-items-center gap-2">
            <FiFilter className="text-muted flex-shrink-0" />
            <select
              className="form-select form-select-sm"
              value={selectedLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
            >
              <option value="All">All Languages</option>
              {availableLanguages.map((lang, idx) => (
                <option key={idx} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort */}
        <div className="col-12 col-sm-6 col-md-3">
          <select
            className="form-select form-select-sm"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="updated">Recently Updated</option>
            <option value="stars">Most Stars</option>
            <option value="forks">Most Forks</option>
            <option value="name">Alphabetical</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default RepositorySearchFilterSort;
