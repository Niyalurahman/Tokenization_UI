import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Trash2, Sun, Moon, Building2 } from 'lucide-react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { useTheme } from './providers/ThemeProvider';
import type { Notification } from '../../types';
import { mockNotifications } from '../../data/mockData';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  //useOnClickOutside(notificationRef, () => setShowNotifications(false));

  const clearNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
  };
  
  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'text-brand dark:text-white bg-gray-200 dark:bg-gray-700'
        : 'text-text-light dark:text-text-dark-light hover:text-text dark:hover:text-text-dark'
    }`;
  };

  return (
    <header className="bg-background dark:bg-background-dark-light/50 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-border-light dark:border-border-dark">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 text-brand font-bold text-xl">
              <Building2 size={28} />
              <span className="hidden sm:inline">LAOZ Global</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/portfolio" className={getLinkClass('/portfolio')}>
                  Portfolio
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full text-text-light dark:text-text-dark-light hover:bg-gray-200 dark:hover:bg-background-dark-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark focus:ring-brand">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <div className="relative" ref={notificationRef}>
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 rounded-full text-text-light dark:text-text-dark-light hover:bg-gray-200 dark:hover:bg-background-dark-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark focus:ring-brand">
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-brand ring-2 ring-background dark:ring-background-dark-light" />
                )}
              </button>
              {showNotifications && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-background dark:bg-background-dark-light ring-1 ring-black ring-opacity-5 focus:outline-none animate-fade-in-down">
                  <div className="py-1">
                    <div className="px-4 py-2 flex justify-between items-center border-b border-border-light dark:border-border-dark">
                      <h3 className="text-sm font-medium text-text dark:text-text-dark">Notifications</h3>
                      {notifications.length > 0 && (
                        <button onClick={clearNotifications} className="text-xs text-brand hover:underline flex items-center gap-1">
                          <Trash2 size={12} />
                          Clear All
                        </button>
                      )}
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notif) => (
                          <div key={notif.id} className="block px-4 py-3 text-sm text-text-light dark:text-text-dark-light border-b border-border-light dark:border-border-dark last:border-b-0 hover:bg-background-light dark:hover:bg-gray-700">
                            {notif.message}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-sm text-center text-text-light dark:text-text-dark-light">
                          No new notifications.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};