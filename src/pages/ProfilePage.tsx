import { useState, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import { employerService } from '../services/employerService';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ROLE_LABELS } from '../utils/constants';
import { User, Building2 } from 'lucide-react';

export const ProfilePage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // User profile fields
  const [fullName, setFullName] = useState(user?.full_name || '');

  // Employer profile fields
  const [companyName, setCompanyName] = useState(
    user?.employer?.company_name || ''
  );
  const [companyDescription, setCompanyDescription] = useState(
    user?.employer?.company_description || ''
  );
  const [companyWebsite, setCompanyWebsite] = useState(
    user?.employer?.company_website || ''
  );

  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!user?.id) throw new Error('User not found');

      // Update user profile
      await userService.updateUserProfile(user.id, {
        full_name: fullName,
      });

      // If employer, update employer profile
      if (user.role === 'employer' && user.employer?.id) {
        await employerService.updateEmployerProfile(user.employer.id, {
          company_name: companyName,
          company_description: companyDescription || null,
          company_website: companyWebsite || null,
        });
      }

      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Profile Settings</h1>

      <div className="space-y-6">
        {/* User Information Card */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center mb-6">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Account Information
              </h2>
              <p className="text-sm text-slate-500">
                {ROLE_LABELS[user.role]}
              </p>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-6">
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-md p-3">
                <p className="text-sm text-green-800">{success}</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-2 border border-slate-300 rounded-md bg-slate-50 text-slate-500 cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-slate-500">
                Email cannot be changed
              </p>
            </div>

            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Full Name *
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Role
              </label>
              <input
                id="role"
                type="text"
                value={ROLE_LABELS[user.role]}
                disabled
                className="w-full px-4 py-2 border border-slate-300 rounded-md bg-slate-50 text-slate-500 cursor-not-allowed"
              />
            </div>

            {user.role === 'employer' && (
              <>
                <div className="border-t border-slate-200 pt-6">
                  <div className="flex items-center mb-4">
                    <Building2 className="h-5 w-5 text-slate-600 mr-2" />
                    <h3 className="text-lg font-semibold text-slate-900">
                      Company Information
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="companyName"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Company Name *
                      </label>
                      <input
                        id="companyName"
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="companyWebsite"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Company Website
                      </label>
                      <input
                        id="companyWebsite"
                        type="url"
                        value={companyWebsite}
                        onChange={(e) => setCompanyWebsite(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="companyDescription"
                        className="block text-sm font-medium text-slate-700 mb-2"
                      >
                        Company Description
                      </label>
                      <textarea
                        id="companyDescription"
                        value={companyDescription}
                        onChange={(e) => setCompanyDescription(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Brief description of your company..."
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? <LoadingSpinner size="sm" /> : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>

        {/* Account Details */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Account Details
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Account Created</span>
              <span className="text-slate-900 font-medium">
                {new Date(user.created_at).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Last Updated</span>
              <span className="text-slate-900 font-medium">
                {new Date(user.updated_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

