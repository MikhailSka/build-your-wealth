'use client';

import { useEffect, useRef } from 'react';
import { User, Settings, BookOpen, BarChart3, LogOut, Bell, Mail } from 'lucide-react';
import './ProfileMenu.css';

interface ProfileMenuProps {
  onClose: () => void;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    console.log('Logout clicked');
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className="profile-dropdown" ref={menuRef}>
      <div className="profile-dropdown-content">
        <div className="profile-header">
          <div className="profile-info">
            <div className="profile-avatar">
              <User size={20} />
            </div>
            <div className="profile-details">
              <h3>John Doe</h3>
              <p>Premium Member</p>
            </div>
          </div>
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-value">12</span>
              <span className="stat-label">Lessons</span>
            </div>
            <div className="stat">
              <span className="stat-value">85%</span>
              <span className="stat-label">Progress</span>
            </div>
          </div>
        </div>

        <div className="profile-menu-list">
          <a href="#" className="menu-item" onClick={onClose}>
            <BookOpen className="menu-icon" />
            My Learning
          </a>
          <a href="#" className="menu-item" onClick={onClose}>
            <BarChart3 className="menu-icon" />
            Progress
          </a>
          <a href="#" className="menu-item" onClick={onClose}>
            <Bell className="menu-icon" />
            Notifications
          </a>
          <a href="#" className="menu-item" onClick={onClose}>
            <Mail className="menu-icon" />
            Messages
          </a>
          <div className="menu-divider"></div>
          <a href="#" className="menu-item" onClick={onClose}>
            <Settings className="menu-icon" />
            Settings
          </a>
        </div>

        <div className="profile-footer">
          <button className="logout-button" onClick={handleLogout}>
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}; 