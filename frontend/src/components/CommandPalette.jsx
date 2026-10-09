import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiSearch,
  FiGrid,
  FiFolder,
  FiBriefcase,
  FiFileText,
  FiBookOpen,
  FiBarChart2,
  FiGithub,
  FiCode,
  FiLinkedin,
  FiUser,
  FiPlus,
  FiMoon,
  FiSun,
  FiLogOut,
  FiArrowRight,
} from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import './CommandPalette.css';

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  const allItems = useMemo(
    () => [
      // Navigation
      { id: 'dash', title: 'Dashboard', category: 'Navigation', icon: FiGrid, action: () => navigate('/dashboard') },
      { id: 'proj', title: 'Projects Portfolio', category: 'Navigation', icon: FiFolder, action: () => navigate('/projects') },
      { id: 'jobs', title: 'Job Tracker & Pipeline', category: 'Navigation', icon: FiBriefcase, action: () => navigate('/jobs') },
      { id: 'res', title: 'ATS Resume Builder', category: 'Navigation', icon: FiFileText, action: () => navigate('/resume') },
      { id: 'notes', title: 'Notes & Scratchpad', category: 'Navigation', icon: FiBookOpen, action: () => navigate('/notes') },
      { id: 'analytics', title: 'Career Analytics', category: 'Navigation', icon: FiBarChart2, action: () => navigate('/analytics') },
      { id: 'gh', title: 'GitHub Integration', category: 'Navigation', icon: FiGithub, action: () => navigate('/github') },
      { id: 'lc', title: 'LeetCode Analytics', category: 'Navigation', icon: FiCode, action: () => navigate('/leetcode') },
      { id: 'in', title: 'LinkedIn Optimizer', category: 'Navigation', icon: FiLinkedin, action: () => navigate('/linkedin') },
      { id: 'prof', title: 'Profile Settings', category: 'Navigation', icon: FiUser, action: () => navigate('/profile') },

      // Quick Actions
      { id: 'act-new-job', title: 'Track New Job Application', category: 'Quick Action', icon: FiPlus, action: () => navigate('/jobs/new') },
      { id: 'act-new-proj', title: 'Create New Project', category: 'Quick Action', icon: FiPlus, action: () => navigate('/projects') },
      { id: 'act-new-note', title: 'Create New Note', category: 'Quick Action', icon: FiPlus, action: () => navigate('/notes') },
      { id: 'act-theme', title: `Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`, category: 'Quick Action', icon: theme === 'light' ? FiMoon : FiSun, action: () => toggleTheme() },
      { id: 'act-logout', title: 'Sign Out of DevBoard', category: 'Quick Action', icon: FiLogOut, action: () => { logout(); navigate('/login'); } },
    ],
    [navigate, theme, toggleTheme, logout]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return allItems;
    const q = query.toLowerCase();
    return allItems.filter(
      (item) => item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    );
  }, [allItems, query]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="cmd-backdrop" onClick={onClose}>
      <div className="cmd-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-header">
          <FiSearch className="cmd-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Type a command or search pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="cmd-badge-esc">ESC</span>
        </div>

        <div className="cmd-list" ref={listRef}>
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-muted small">No matching commands found.</div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  className={`cmd-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="cmd-item-left">
                    <span className="cmd-item-icon">
                      <Icon />
                    </span>
                    <span className="cmd-item-title">{item.title}</span>
                  </div>
                  <span className="cmd-item-badge">{item.category}</span>
                </div>
              );
            })
          )}
        </div>

        <div className="cmd-footer">
          <div className="cmd-shortcuts">
            <span className="cmd-shortcut-item">
              <span className="cmd-key">↑↓</span> Navigate
            </span>
            <span className="cmd-shortcut-item">
              <span className="cmd-key">↵</span> Select
            </span>
            <span className="cmd-shortcut-item">
              <span className="cmd-key">esc</span> Close
            </span>
          </div>
          <span>DevBoard Command Center</span>
        </div>
      </div>
    </div>
  );
}
