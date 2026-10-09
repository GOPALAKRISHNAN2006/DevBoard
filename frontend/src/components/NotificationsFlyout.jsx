import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiBriefcase,
  FiFileText,
  FiGithub,
  FiCode,
  FiCheckCircle,
} from 'react-icons/fi';
import './NotificationsFlyout.css';

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Interview Upcoming: Stripe',
    message: 'Round 2 technical screen scheduled for Thursday. Review system design concepts.',
    time: '2 hours ago',
    icon: FiBriefcase,
    tone: 'purple',
    link: '/jobs',
    unread: true,
  },
  {
    id: 2,
    title: 'ATS Resume Score Ready',
    message: 'Frontend Developer template analyzed with 94% job description compatibility.',
    time: '5 hours ago',
    icon: FiFileText,
    tone: 'blue',
    link: '/resume',
    unread: true,
  },
  {
    id: 3,
    title: 'GitHub Analytics Synchronized',
    message: 'Detected 4 new commits and 1 repository update.',
    time: 'Yesterday',
    icon: FiGithub,
    tone: 'green',
    link: '/github',
    unread: false,
  },
  {
    id: 4,
    title: 'LeetCode Daily Streak Active',
    message: 'Solve today’s challenge to maintain your problem-solving momentum.',
    time: '1 day ago',
    icon: FiCode,
    tone: 'orange',
    link: '/leetcode',
    unread: false,
  },
];

export default function NotificationsFlyout({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const flyoutRef = useRef(null);
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleClick = (item) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, unread: false } : n))
    );
    navigate(item.link);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (flyoutRef.current && !flyoutRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="notifications-popover" ref={flyoutRef}>
      <div className="notifications-header">
        <h6>
          Notifications
          {unreadCount > 0 && <span className="notifications-count">{unreadCount}</span>}
        </h6>
        {unreadCount > 0 && (
          <button type="button" className="btn-mark-read" onClick={markAllRead}>
            Mark all read
          </button>
        )}
      </div>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-muted small">No notifications at the moment.</div>
        ) : (
          notifications.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`notification-item ${item.unread ? 'unread' : ''}`}
                onClick={() => handleClick(item)}
              >
                <div className={`notif-icon-wrap ${item.tone}`}>
                  <Icon />
                </div>
                <div className="notif-content">
                  <div className="notif-title">{item.title}</div>
                  <div className="notif-message">{item.message}</div>
                  <div className="notif-time">{item.time}</div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="notifications-footer">
        <button
          type="button"
          className="btn-mark-read"
          onClick={() => {
            markAllRead();
            navigate('/dashboard');
            onClose();
          }}
        >
          View Activity Center
        </button>
      </div>
    </div>
  );
}
