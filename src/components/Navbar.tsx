import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import { Button } from './Button';

export const Navbar = () => {
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
            <Link to="/" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">
              Find Jobs
            </Link>
            <div className="hidden sm:flex items-center space-x-4">
              <Button variant="outline" size="sm">Sign In</Button>
              <Button size="sm">Post a Job</Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

