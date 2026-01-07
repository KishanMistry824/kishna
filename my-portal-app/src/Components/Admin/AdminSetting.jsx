import React, { useState } from "react";

const AdminSettings = () => {
  const [notifications, setNotifications] = useState({
    jobAlerts: true,
    newUsers: false,
    reports: true,
    systemWarnings: true,
  });

  const [appearance, setAppearance] = useState("light");

  const handleToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="tw-max-w-5xl tw-mx-auto tw-p-8 tw-mt-10 tw-space-y-10">
      {/* Page Title */}
      <h1 className="tw-text-4xl tw-font-bold tw-text-center tw-text-[#2563eb] tw-drop-shadow-lg">
        Admin Settings Panel
      </h1>

      {/* MAIN CARD */}
      <div className="tw-bg-gradient-to-br tw-from-[#e0f2fe] tw-via-white tw-to-[#f1f5f9] tw-rounded-3xl tw-shadow-2xl tw-p-10 tw-border tw-border-blue-100">
        
        {/* PROFILE */}
        <div className="tw-mb-12">
          <h3 className="tw-text-2xl tw-font-semibold tw-text-gray-800 tw-mb-6 tw-border-l-4 tw-border-blue-500 tw-pl-3">
            Profile Information
          </h3>

          <div className="tw-grid md:tw-grid-cols-2 tw-gap-8">
            <div>
              <label className="tw-text-gray-700 tw-font-medium">Full Name</label>
              <input
                type="text"
                className="tw-w-full tw-mt-2 tw-p-3 tw-rounded-xl tw-border tw-border-gray-300 focus:tw-border-blue-500 focus:tw-outline-none"
                placeholder="Enter admin name"
              />
            </div>

            <div>
              <label className="tw-text-gray-700 tw-font-medium">Email</label>
              <input
                type="email"
                className="tw-w-full tw-mt-2 tw-p-3 tw-rounded-xl tw-border tw-border-gray-300 focus:tw-border-blue-500 focus:tw-outline-none"
                placeholder="admin@example.com"
              />
            </div>
          </div>
        </div>

        {/* PASSWORD */}
        <div className="tw-mb-12">
          <h3 className="tw-text-2xl tw-font-semibold tw-text-gray-800 tw-mb-6 tw-border-l-4 tw-border-pink-500 tw-pl-3">
            Change Password
          </h3>

          <div className="tw-grid md:tw-grid-cols-2 tw-gap-8">
            <div>
              <label className="tw-text-gray-700 tw-font-medium">Current Password</label>
              <input
                type="password"
                className="tw-w-full tw-mt-2 tw-p-3 tw-rounded-xl tw-border tw-border-gray-300 focus:tw-outline-none"
              />
            </div>

            <div>
              <label className="tw-text-gray-700 tw-font-medium">New Password</label>
              <input
                type="password"
                className="tw-w-full tw-mt-2 tw-p-3 tw-rounded-xl tw-border tw-border-gray-300 focus:tw-outline-none"
              />
            </div>
          </div>
        </div>

        {/* NOTIFICATION SETTINGS */}
        <div className="tw-mb-12">
          <h3 className="tw-text-2xl tw-font-semibold tw-text-gray-800 tw-mb-6 tw-border-l-4 tw-border-green-500 tw-pl-3">
            Notification Settings
          </h3>

          <div className="tw-space-y-4">
            {Object.keys(notifications).map((key) => (
              <div
                key={key}
                className="tw-flex tw-items-center tw-justify-between tw-bg-white tw-p-4 tw-shadow-md tw-rounded-xl tw-border tw-border-gray-200"
              >
                <span className="tw-text-gray-700 tw-font-medium tw-capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>

                <button
                  onClick={() => handleToggle(key)}
                  className={`tw-w-14 tw-h-7 tw-rounded-full tw-relative tw-transition-all tw-duration-300 ${
                    notifications[key]
                      ? "tw-bg-green-500"
                      : "tw-bg-gray-300"
                  }`}
                >
                  <span
                    className={`tw-w-6 tw-h-6 tw-rounded-full tw-bg-white tw-absolute tw-top-0.5 tw-transition-all tw-duration-300 tw-shadow ${
                      notifications[key]
                        ? "tw-right-0.5"
                        : "tw-left-0.5"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* APPEARANCE SETTINGS */}
        <div className="tw-mb-12">
          <h3 className="tw-text-2xl tw-font-semibold tw-text-gray-800 tw-mb-6 tw-border-l-4 tw-border-purple-500 tw-pl-3">
            Appearance Settings
          </h3>

          <div className="tw-flex tw-gap-6">
            {["light", "dark", "blue"].map((theme) => (
              <button
                key={theme}
                onClick={() => setAppearance(theme)}
                className={`tw-px-6 tw-py-3 tw-rounded-xl tw-font-semibold tw-transition tw-duration-300 ${
                  appearance === theme
                    ? "tw-bg-purple-600 tw-text-white tw-shadow-lg"
                    : "tw-bg-purple-100 tw-text-purple-700 hover:tw-bg-purple-200"
                }`}
              >
                {theme.charAt(0).toUpperCase() + theme.slice(1)} Mode
              </button>
            ))}
          </div>
        </div>

        {/* SYSTEM SETTINGS */}
        <div className="tw-mb-12">
          <h3 className="tw-text-2xl tw-font-semibold tw-text-gray-800 tw-mb-6 tw-border-l-4 tw-border-orange-500 tw-pl-3">
            System Settings
          </h3>

          <div className="tw-grid md:tw-grid-cols-2 tw-gap-8">
            <div>
              <label className="tw-font-medium tw-text-gray-700">Session Timeout</label>
              <select className="tw-w-full tw-p-3 tw-mt-2 tw-rounded-xl tw-border tw-border-gray-300">
                <option>15 Minutes</option>
                <option>30 Minutes</option>
                <option>1 Hour</option>
                <option>Never</option>
              </select>
            </div>

            <div>
              <label className="tw-font-medium tw-text-gray-700">Backup Frequency</label>
              <select className="tw-w-full tw-p-3 tw-mt-2 tw-rounded-xl tw-border tw-border-gray-300">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <button className="tw-w-full tw-bg-gradient-to-r tw-from-blue-600 tw-to-blue-800 tw-text-white tw-font-semibold tw-p-4 tw-rounded-xl tw-shadow-xl hover:tw-opacity-90 tw-transition">
          Save All Changes
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
