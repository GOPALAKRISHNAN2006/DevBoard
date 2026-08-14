import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { FiMenu, FiLogOut, FiUser, FiSearch, FiBell, FiMoon, FiSun } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ onMenu }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const nav = useNavigate();
  const [show, setShow] = useState(false);

  const out = () => {
    logout();
    nav("/login");
  };

  return (
    <header className="topbar" data-testid="app-navbar">
      <div className="topbar-left">
        <button className="menu-btn d-lg-none" aria-label="Open navigation" data-testid="sidebar-open-button" onClick={onMenu}>
          <FiMenu />
        </button>
        <div className="welcome d-none d-md-flex">
          <span className="welcome-text">Welcome back,</span>
          <strong className="welcome-name">{user?.name?.split(" ")[0] || "Developer"}!</strong>
        </div>
      </div>

      <div className="topbar-center d-none d-md-flex">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search anything..." className="search-input" data-testid="global-search-input" />
          <div className="search-shortcut">⌘K</div>
        </div>
      </div>

      <div className="topbar-right">
        <button className="icon-btn theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme" data-testid="theme-toggle-button">
          {theme === "light" ? <FiMoon /> : <FiSun />}
        </button>
        
        <button className="icon-btn notification-btn" aria-label="Notifications" data-testid="notifications-button">
          <FiBell />
          <span className="notification-badge"></span>
        </button>

        <div className="divider d-none d-sm-block"></div>

        <Dropdown align="end" show={show} onToggle={setShow}>
          <Dropdown.Toggle className="profile-toggle" data-testid="profile-menu-toggle">
            <div className="avatar">
              {user?.name?.[0]?.toUpperCase() || "D"}
            </div>
            <div className="profile-info d-none d-sm-flex">
              <span className="profile-name">{user?.name || "Developer"}</span>
              <span className="profile-role">Admin</span>
            </div>
          </Dropdown.Toggle>
          
          <Dropdown.Menu className="profile-menu">
            <div className="profile-menu-header">
              <strong>{user?.email || "dev@example.com"}</strong>
            </div>
            <Dropdown.Divider />
            <Dropdown.Item data-testid="profile-settings-link" onClick={() => nav("/profile")}>
              <FiUser /> Profile Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="text-danger" data-testid="profile-menu-logout-button" onClick={out}>
              <FiLogOut /> Sign out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
}
