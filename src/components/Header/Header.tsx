'use client';

import { useState } from 'react';
import { User, Bell, Menu, X, Sun, Moon, Settings, BookOpen, BarChart3, LogOut, Mail } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ProfileMenu } from '../ProfileMenu/ProfileMenu';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import { Button } from '../Button/Button';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import './Header.css';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    closeMobileSidebar();
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <Link href="/" className="logo-link">
              <div>
                <h1 className="app-title">{t('header.title')}</h1>
                <p className="app-subtitle">Master the art of investing</p>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="header-nav desktop-nav">
            <Link 
              href="/lessons" 
              className={`nav-link ${pathname === '/lessons' ? 'active' : ''}`}
            >
              {t('nav.lessons')}
            </Link>
            <Link 
              href="/calculators" 
              className={`nav-link ${pathname === '/calculators' ? 'active' : ''}`}
            >
              {t('nav.calculators')}
            </Link>
          </nav>
          
          <div className="header-right">
            {/* Desktop Actions */}
            <div className="desktop-actions">
              <LanguageSwitcher />
              <ThemeToggle />
              
              <div className="profile-button-container">
                <Button 
                  variant="icon" 
                  size="medium"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  aria-label="Profile"
                >
                  <User size={20} />
                </Button>
                
                {isProfileMenuOpen && (
                  <ProfileMenu onClose={() => setIsProfileMenuOpen(false)} />
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button 
              variant="icon" 
              size="medium"
              className="mobile-menu-button"
              onClick={() => setIsMobileSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div className="mobile-sidebar-overlay" onClick={closeMobileSidebar}>
          <div className="mobile-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-sidebar-header">
              <h3>Menu</h3>
              <div className="mobile-sidebar-header-actions">
                <LanguageSwitcher />
                <Button 
                  variant="icon" 
                  size="small"
                  onClick={closeMobileSidebar}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </Button>
              </div>
            </div>

            <div className="mobile-sidebar-content">
              <nav className="mobile-sidebar-nav">
                <Link 
                  href="/" 
                  className={`mobile-nav-link ${pathname === '/' ? 'active' : ''}`}
                  onClick={closeMobileSidebar}
                >
                  {t('nav.home')}
                </Link>
                <Link 
                  href="/lessons" 
                  className={`mobile-nav-link ${pathname === '/lessons' ? 'active' : ''}`}
                  onClick={closeMobileSidebar}
                >
                  {t('nav.lessons')}
                </Link>
                <Link 
                  href="/calculators" 
                  className={`mobile-nav-link ${pathname === '/calculators' ? 'active' : ''}`}
                  onClick={closeMobileSidebar}
                >
                  {t('nav.calculators')}
                </Link>
              </nav>

              <div className="mobile-sidebar-bottom">
                {/* Profile Section */}
                <div className="mobile-profile-section">
                  <div className="mobile-profile-header">
                    <div className="mobile-profile-info">
                      <div className="mobile-profile-avatar">
                        <User size={18} />
                      </div>
                      <div className="mobile-profile-details">
                        <h4>John Doe</h4>
                        <p>Premium Member</p>
                      </div>
                      <Button 
                        variant="icon" 
                        size="small"
                        onClick={toggleTheme}
                        className="mobile-theme-button"
                        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                      >
                        {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                      </Button>
                    </div>
                    <div className="mobile-profile-stats">
                      <div className="mobile-stat">
                        <span className="mobile-stat-value">12</span>
                        <span className="mobile-stat-label">{t('profile.stats.lessonsCompleted')}</span>
                      </div>
                      <div className="mobile-stat">
                        <span className="mobile-stat-value">24</span>
                        <span className="mobile-stat-label">{t('profile.stats.hoursLearned')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mobile-profile-menu">
                    <a href="#" className="mobile-profile-item" onClick={closeMobileSidebar}>
                      <BookOpen size={18} />
                      <span>{t('profile.menu.profile')}</span>
                    </a>
                    <a href="#" className="mobile-profile-item" onClick={closeMobileSidebar}>
                      <BarChart3 size={18} />
                      <span>Progress</span>
                    </a>
                    <a href="#" className="mobile-profile-item" onClick={closeMobileSidebar}>
                      <Bell size={18} />
                      <span>{t('profile.menu.notifications')}</span>
                    </a>
                    <a href="#" className="mobile-profile-item" onClick={closeMobileSidebar}>
                      <Mail size={18} />
                      <span>Messages</span>
                    </a>
                    <a href="#" className="mobile-profile-item" onClick={closeMobileSidebar}>
                      <Settings size={18} />
                      <span>{t('profile.menu.settings')}</span>
                    </a>
                  </div>

                  <button className="mobile-logout-button" onClick={handleLogout}>
                    <LogOut size={18} />
                    <span>{t('profile.menu.logout')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 