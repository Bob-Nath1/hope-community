import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { FaBell, FaLock, FaUserCog, FaPalette, FaInfoCircle } from "react-icons/fa";

const SettingSection = ({ onBack }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-all duration-300">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-blue-600 text-white shadow">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 hover:text-gray-200"
        >
          <IoArrowBack size={22} />
          <span>Back</span>
        </button>
        <h1 className="text-xl font-semibold">Settings</h1>
        <div className="w-6"></div>
      </header>

      {/* Settings Options */}
      <div className="max-w-md mx-auto mt-6 bg-white dark:bg-gray-800 shadow-md rounded-2xl p-5 space-y-5">
        {/* Account */}
        <div>
          <h2 className="text-gray-800 dark:text-gray-100 font-semibold mb-3 flex items-center space-x-2">
            <FaUserCog />
            <span>Account</span>
          </h2>
          <button className="w-full text-left border-b py-2 text-gray-700 dark:text-gray-300 hover:text-blue-500">
            Change Password
          </button>
          <button className="w-full text-left border-b py-2 text-gray-700 dark:text-gray-300 hover:text-blue-500">
            Update Profile
          </button>
        </div>

        {/* Notifications */}
        <div>
          <h2 className="text-gray-800 dark:text-gray-100 font-semibold mb-3 flex items-center space-x-2">
            <FaBell />
            <span>Notifications</span>
          </h2>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-gray-700 dark:text-gray-300">Enable Notifications</span>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              className="toggle-checkbox h-5 w-5 accent-blue-500"
            />
          </label>
        </div>

        {/* Appearance */}
        <div>
          <h2 className="text-gray-800 dark:text-gray-100 font-semibold mb-3 flex items-center space-x-2">
            <FaPalette />
            <span>Appearance</span>
          </h2>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="toggle-checkbox h-5 w-5 accent-blue-500"
            />
          </label>
        </div>

        {/* Language */}
        <div>
          <h2 className="text-gray-800 dark:text-gray-100 font-semibold mb-3">
            Language
          </h2>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          >
            <option>English</option>
            <option>French</option>
            <option>Spanish</option>
            <option>Swahili</option>
          </select>
        </div>

        {/* Privacy & Support */}
        <div>
          <h2 className="text-gray-800 dark:text-gray-100 font-semibold mb-3 flex items-center space-x-2">
            <FaLock />
            <span>Privacy & Security</span>
          </h2>
          <button className="w-full text-left border-b py-2 text-gray-700 dark:text-gray-300 hover:text-blue-500">
            Manage Privacy
          </button>
          <button className="w-full text-left py-2 text-gray-700 dark:text-gray-300 hover:text-blue-500">
            Two-Factor Authentication
          </button>
        </div>

        {/* About */}
        <div>
          <h2 className="text-gray-800 dark:text-gray-100 font-semibold mb-3 flex items-center space-x-2">
            <FaInfoCircle />
            <span>About</span>
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Version 1.0.0 — Built for contributors and community members to
            collaborate, grow, and share joy together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingSection;
