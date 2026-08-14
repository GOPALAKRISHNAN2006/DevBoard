import { NavLink, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiFolder,
  FiBriefcase,
  FiFileText,
  FiGithub,
  FiCode,
  FiUser,
  FiLogOut,
  FiX,
  FiCpu,
  FiBookOpen,
  FiBarChart2,
  FiLinkedin
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

const links = [
  ["/dashboard", "Dashboard", FiGrid],
  ["/projects", "Projects", FiFolder],
  ["/jobs", "Job Tracker", FiBriefcase],
  ["/resume", "Resume", FiFileText],
  ["/notes", "Notes", FiBookOpen],
  ["/analytics", "Analytics", FiBarChart2],
  ["/github", "GitHub", FiGithub],
  ["/leetcode", "LeetCode", FiCode],
  ["/linkedin", "LinkedIn", FiLinkedin],
  ["/profile", "Profile Settings", FiUser],
];

export default function Sidebar({ open, setOpen }) {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const out = () => {
    logout();
    nav("/login");
  };

  return (
    <>
      <div
        className={`side-backdrop ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />
      <aside className={`sidebar ${open ? "open" : ""}`} data-testid="app-sidebar">
        <div className="sidebar-header">
          <div className="brand">
            <div className="brand-icon">
              <FiCpu />
            </div>
            <span className="brand-text">DevBoard</span>
          </div>
          <button className="close-btn d-lg-none" aria-label="Close navigation" data-testid="sidebar-close-button" onClick={() => setOpen(false)}>
            <FiX />
          </button>
        </div>

        <div className="sidebar-content">
          <div className="nav-section">
            <small className="nav-label">WORKSPACE</small>
            <nav className="nav-menu">
              {links.map(([to, label, Icon]) => (
                <NavLink 
                  key={to} 
                  to={to} 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  <Icon className="nav-icon" />
                  <span className="nav-text">{label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="user-profile-card">
            <div className="user-avatar">
              {user?.name?.[0]?.toUpperCase() || "D"}
            </div>
            <div className="user-details">
              <span className="user-name">{user?.name || "Developer"}</span>
              <span className="user-email">{user?.email || "dev@example.com"}</span>
            </div>
          </div>
          <button className="logout-btn" data-testid="logout-button" onClick={out}>
            <FiLogOut /> 
            <span>Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
