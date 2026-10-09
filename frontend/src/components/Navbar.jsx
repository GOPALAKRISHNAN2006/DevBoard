import { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import {
  FiMenu,
  FiLogOut,
  FiUser,
  FiSearch,
  FiBell,
  FiMoon,
  FiSun,
  FiPlus,
  FiFolder,
  FiBriefcase,
  FiBookOpen,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import CommandPalette from "./CommandPalette";
import NotificationsFlyout from "./NotificationsFlyout";
import "./Navbar.css";

export default function Navbar({ onMenu }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const nav = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showCmd, setShowCmd] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowCmd((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const out = () => {
    logout();
    nav("/login");
  };

  return (
    <>
      <header className="topbar" data-testid="app-navbar">
        <div className="topbar-left">
          <button
            className="menu-btn d-lg-none"
            aria-label="Open navigation"
            data-testid="sidebar-open-button"
            onClick={onMenu}
          >
            <FiMenu />
          </button>
          <div className="welcome d-none d-md-flex">
            <span className="welcome-text">Welcome back,</span>
            <strong className="welcome-name">
              {user?.name?.split(" ")[0] || "Developer"}!
            </strong>
          </div>
        </div>

        <div className="topbar-center d-none d-md-flex">
          <div
            className="search-bar"
            onClick={() => setShowCmd(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setShowCmd(true)}
          >
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search anything or run commands..."
              className="search-input"
              data-testid="global-search-input"
              readOnly
            />
            <div className="search-shortcut">⌘K</div>
          </div>
        </div>

        <div className="topbar-right">
          {/* Quick Create Dropdown */}
          <Dropdown
            align="end"
            show={showQuickAdd}
            onToggle={setShowQuickAdd}
            className="d-none d-sm-block"
          >
            <Dropdown.Toggle
              variant="outline-primary"
              size="sm"
              className="quick-add-btn d-flex align-items-center gap-1"
              data-testid="quick-add-button"
            >
              <FiPlus /> <span>New</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="profile-menu">
              <Dropdown.Item onClick={() => nav("/projects")}>
                <FiFolder className="text-primary me-2" /> New Project
              </Dropdown.Item>
              <Dropdown.Item onClick={() => nav("/jobs/new")}>
                <FiBriefcase className="text-purple me-2" /> Track Job
              </Dropdown.Item>
              <Dropdown.Item onClick={() => nav("/notes")}>
                <FiBookOpen className="text-warning me-2" /> Quick Note
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Theme Toggle */}
          <button
            className="icon-btn theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            data-testid="theme-toggle-button"
            title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
          >
            {theme === "light" ? <FiMoon /> : <FiSun className="text-warning" />}
          </button>

          {/* Notifications Button & Popover */}
          <div className="position-relative">
            <button
              className="icon-btn notification-btn"
              aria-label="Notifications"
              data-testid="notifications-button"
              onClick={() => setShowNotif((prev) => !prev)}
            >
              <FiBell />
              <span className="notification-badge" />
            </button>
            <NotificationsFlyout
              isOpen={showNotif}
              onClose={() => setShowNotif(false)}
            />
          </div>

          <div className="divider d-none d-sm-block" />

          {/* User Profile Dropdown */}
          <Dropdown align="end" show={showProfile} onToggle={setShowProfile}>
            <Dropdown.Toggle
              className="profile-toggle"
              data-testid="profile-menu-toggle"
            >
              <div className="avatar">
                {user?.name?.[0]?.toUpperCase() || "D"}
              </div>
              <div className="profile-info d-none d-sm-flex">
                <span className="profile-name">
                  {user?.name || "Developer"}
                </span>
                <span className="profile-role">Pro Developer</span>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="profile-menu">
              <div className="profile-menu-header">
                <strong>{user?.email || "dev@example.com"}</strong>
              </div>
              <Dropdown.Divider />
              <Dropdown.Item
                data-testid="profile-settings-link"
                onClick={() => nav("/profile")}
              >
                <FiUser /> Profile Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                className="text-danger"
                data-testid="profile-menu-logout-button"
                onClick={out}
              >
                <FiLogOut /> Sign out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>

      {/* Global Command Palette */}
      <CommandPalette isOpen={showCmd} onClose={() => setShowCmd(false)} />
    </>
  );
}
