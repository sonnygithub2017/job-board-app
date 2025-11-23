import { Link } from 'react-router-dom';
import { Briefcase, User, LogOut, Settings } from 'lucide-react';
import { Button } from './Button';
import { useAuth } from '../context/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { ROLE_LABELS } from '../utils/constants';

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-slate-900">JobBoard</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Find Jobs
            </Link>

            {!user ? (
              <>
                <div className="hidden sm:flex items-center space-x-4">
                  <Link to="/login">
                    <Button variant="outline" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm">Post a Job</Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                {user.role === 'employer' && (
                  <>
                    <Link
                      to="/employer/dashboard"
                      className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      My Jobs
                    </Link>
                    <Link to="/employer/post-job">
                      <Button size="sm">Post Job</Button>
                    </Link>
                  </>
                )}

                {user.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Admin Dashboard
                  </Link>
                )}

                {/* User Menu */}
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="hidden sm:inline">{user.full_name}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-slate-200 py-1 z-50">
                      <div className="px-4 py-3 border-b border-slate-200">
                        <p className="text-sm font-medium text-slate-900">{user.full_name}</p>
                        <p className="text-xs text-slate-500 mt-1">{user.email}</p>
                        <p className="text-xs text-blue-600 mt-1">
                          {ROLE_LABELS[user.role]}
                        </p>
                      </div>

                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Profile Settings
                      </Link>

                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          handleSignOut();
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
