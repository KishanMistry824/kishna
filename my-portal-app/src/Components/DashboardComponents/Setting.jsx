import React from "react";

export default function UserSettingsOnly() {
  return (
    <div className="tw-min-h-screen tw-bg-gradient-to-br tw-from-[#eef2ff] tw-via-white tw-to-[#fdf2f8] tw-p-10 tw-flex tw-justify-center tw-items-start">
      <div className="tw-w-full md:tw-w-3/4 lg:tw-w-2/3 tw-bg-white tw-rounded-3xl tw-shadow-2xl tw-p-10 tw-border tw-border-gray-100">
        <h1 className="tw-text-3xl tw-font-extrabold tw-text-[#1e1b4b] tw-mb-6">User Settings</h1>

        <div className="tw-space-y-10">

          {/* PROFILE INFO */}
          <section className="tw-bg-white tw-rounded-2xl tw-shadow-lg tw-p-6 tw-border tw-border-gray-100">
            <h2 className="tw-text-xl tw-font-semibold tw-mb-4">Profile Information</h2>

            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
              <div>
                <label className="tw-text-sm tw-font-medium">Full Name</label>
                <input className="tw-w-full tw-px-4 tw-py-2 tw-rounded-xl tw-border tw-border-gray-300 tw-mt-1" placeholder="Enter your name" />
              </div>
              <div>
                <label className="tw-text-sm tw-font-medium">Email</label>
                <input className="tw-w-full tw-px-4 tw-py-2 tw-rounded-xl tw-border tw-border-gray-300 tw-mt-1" placeholder="you@example.com" />
              </div>
              <div>
                <label className="tw-text-sm tw-font-medium">Phone Number</label>
                <input className="tw-w-full tw-px-4 tw-py-2 tw-rounded-xl tw-border tw-border-gray-300 tw-mt-1" placeholder="+91 9876543210" />
              </div>
              <div>
                <label className="tw-text-sm tw-font-medium">City</label>
                <input className="tw-w-full tw-px-4 tw-py-2 tw-rounded-xl tw-border tw-border-gray-300 tw-mt-1" placeholder="Your city" />
              </div>
            </div>
          </section>

          {/* RESUME */}
          <section className="tw-bg-white tw-rounded-2xl tw-shadow-lg tw-p-6 tw-border tw-border-gray-100">
            <h2 className="tw-text-xl tw-font-semibold tw-mb-4">Resume</h2>
            <div className="tw-border tw-border-dashed tw-border-gray-300 tw-rounded-2xl tw-p-8 tw-text-center">
              <p className="tw-text-gray-600 tw-mb-3 tw-text-sm">Upload your updated resume (PDF)</p>
              <input type="file" accept="application/pdf" className="tw-border tw-border-gray-300 tw-rounded-xl tw-px-3 tw-py-2" />
              <p className="tw-text-xs tw-text-gray-500 tw-mt-2">Max file size: 5MB</p>
            </div>
          </section>

          {/* NOTIFICATIONS */}
          <section className="tw-bg-white tw-rounded-2xl tw-shadow-lg tw-p-6 tw-border tw-border-gray-100">
            <h2 className="tw-text-xl tw-font-semibold tw-mb-4">Notifications</h2>
            <div className="tw-flex tw-flex-col tw-gap-4">
              {["Job Recommendations", "Application Updates", "Events & Hackathons", "Career Tips Newsletter"].map((item) => (
                <label key={item} className="tw-flex tw-items-center tw-justify-between">
                  <span className="tw-font-medium tw-text-sm">{item}</span>
                  <input type="checkbox" className="tw-w-5 tw-h-5" defaultChecked />
                </label>
              ))}
            </div>
          </section>

          {/* THEME */}
          <section className="tw-bg-white tw-rounded-2xl tw-shadow-lg tw-p-6 tw-border tw-border-gray-100">
            <h2 className="tw-text-xl tw-font-semibold tw-mb-4">Theme Preferences</h2>
            <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-4">
              {["Light", "Blue", "Purple", "Dark"].map((theme) => (
                <button key={theme} className="tw-bg-gray-100 tw-py-3 tw-rounded-xl tw-font-medium hover:tw-bg-gray-200">
                  {theme}
                </button>
              ))}
            </div>
          </section>

          {/* SAVE BUTTON */}
          <button className="tw-w-full tw-bg-gradient-to-r tw-from-blue-600 tw-to-purple-600 tw-text-white tw-font-semibold tw-py-3 tw-rounded-xl tw-shadow-lg">
            Save Settings
          </button>

        </div>
      </div>
    </div>
  );
}
