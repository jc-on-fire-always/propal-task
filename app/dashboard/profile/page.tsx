'use client'

import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { User, Mail, Phone, Save } from "lucide-react";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    email: user?.email || "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await updateProfile(
      formData.email,
      formData.password || undefined
    );

    setFormData(prev => ({ ...prev, password: "" }));
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Profile Settings</h1>

        {/* User Info Display */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Current Information</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Username</div>
                <div className="font-medium text-gray-900 dark:text-white">{user?.username}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                <div className="font-medium text-gray-900 dark:text-white">{user?.email}</div>
              </div>
            </div>

            {user?.phone && (
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Phone</div>
                  <div className="font-medium text-gray-900 dark:text-white">{user.phone}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Update Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Update Profile</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter new email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                New Password (Optional)
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter new password (leave blank to keep current)"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:transform-none"
            >
              <Save className="h-5 w-5" />
              <span>{isLoading ? "Updating..." : "Update Profile"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
