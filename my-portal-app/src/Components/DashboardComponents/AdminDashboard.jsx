import React from "react";
import { useNavigate } from "react-router-dom";
/**
 * AdminStaticPage.jsx
 * Static Admin landing page (Tailwind `tw-` classes only)
 * - Total Jobs: 110
 * - Candidates: 50+
 * - Other static cards included: Total Users, New Resumes
 *
 * Drop into your project and render <AdminStaticPage />.
 */

export default function AdminStaticPage() {
    const navigate = useNavigate();
  return (
    <div className="tw-min-h-screen tw-bg-gradient-to-br tw-from-[#f8fafc] tw-via-white tw-to-[#eef2ff] tw-p-8">
      <div className="tw-max-w-7xl tw-mx-auto tw-grid tw-grid-cols-1 md:tw-grid-cols-6 tw-gap-8">
        {/* SIDEBAR */}
        <aside className="tw-col-span-1 md:tw-col-span-1 tw-bg-white tw-rounded-2xl tw-shadow-lg tw-p-6 tw-flex tw-flex-col">
          <div className="tw-flex tw-items-center tw-gap-3 tw-mb-6">
            <div className="tw-w-12 tw-h-12 tw-rounded-xl tw-bg-gradient-to-r tw-from-[#6366f1] tw-to-[#06b6d4] tw-flex tw-items-center tw-justify-center tw-text-white tw-font-bold">
              SH
            </div>
            <div>
              <h3 className="tw-text-lg tw-font-bold">SmartHire</h3>
              <p className="tw-text-xs tw-text-gray-500">Admin Console</p>
            </div>
          </div>

          <nav className="tw-flex-1">
            {[
              { label: "Overview", active: true },
              { label: "Jobs", active: false, page: "/Controller"},
              { label: "Candidates", active: false, page: "/Controller" },
              { label: "Resumes", active: false },
              { label: "Settings", active: false },
            ].map((item) => (
              <div
                 onClick={() => item.page && navigate(item.page)} 
                key={item.label}
                className={`tw-px-3 tw-py-2 tw-mb-2 tw-rounded-xl tw-cursor-pointer tw-text-sm tw-font-medium ${
                  item.active
                    ? "tw-bg-gradient-to-r tw-from-[#06b6d4] tw-to-[#6366f1] tw-text-white"
                    : "tw-text-gray-700 hover:tw-bg-gray-100"
                }`}
              >
                {item.label}
              </div>
            ))}
          </nav>

          <div className="tw-mt-4 tw-text-xs tw-text-gray-500">
            <div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
              <span>Theme</span>
              <span className="tw-text-gray-400">Light</span>
            </div>
            <div className="tw-text-center tw-pt-3 tw-border-t tw-border-gray-100 tw-text-[11px]">
              v1.0 • Static Demo
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="tw-col-span-1 md:tw-col-span-5">
          {/* Header */}
          <header className="tw-flex tw-items-center tw-justify-between tw-mb-6">
            <div>
              <h1 className="tw-text-2xl md:tw-text-3xl tw-font-extrabold tw-text-[#0f172a]">
                Overview
              </h1>
              <p className="tw-text-sm tw-text-gray-500">
                Snapshot of platform activity (static values)
              </p>
            </div>

            <div className="tw-flex tw-items-center tw-gap-3">
              <button className="tw-px-4 tw-py-2 tw-rounded-full tw-bg-gradient-to-r tw-from-[#06b6d4] tw-to-[#7c3aed] tw-text-white tw-font-semibold tw-shadow-md">
                + Add Job
              </button>
              <div className="tw-text-right">
                <div className="tw-text-xs tw-text-gray-500">Welcome back,</div>
                <div className="tw-font-semibold">Admin User</div>
              </div>
            </div>
          </header>

          {/* STAT CARDS */}
          <section className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-5 tw-mb-6">
            <div className="tw-bg-white tw-rounded-2xl tw-p-5 tw-shadow-lg tw-relative overflow-hidden">
              <div className="tw-flex tw-justify-between tw-items-start">
                <div>
                  <p className="tw-text-sm tw-text-gray-500">Total Jobs</p>
                  <h3 className="tw-text-2xl tw-font-bold tw-mt-1">110</h3>
                </div>
                <div className="tw-w-12 tw-h-12 tw-rounded-lg tw-bg-gradient-to-br tw-from-[#06b6d4] tw-to-[#0ea5e9] tw-flex tw-items-center tw-justify-center tw-text-white">
                  <i className="bi bi-briefcase-fill tw-text-lg"></i>
                </div>
              </div>
              <div className="tw-absolute tw-right-0 tw-bottom-0 tw-w-36 tw-h-28 tw-opacity-10" aria-hidden>
                <svg viewBox="0 0 100 100" className="tw-w-full tw-h-full">
                  <defs>
                    <linearGradient id="g1" x1="0" x2="1">
                      <stop offset="0" stopColor="#06b6d4" />
                      <stop offset="1" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                  <circle cx="70" cy="30" r="40" fill="url(#g1)" />
                </svg>
              </div>
            </div>

            <div className="tw-bg-white tw-rounded-2xl tw-p-5 tw-shadow-lg tw-relative overflow-hidden">
              <div className="tw-flex tw-justify-between tw-items-start">
                <div>
                  <p className="tw-text-sm tw-text-gray-500">Candidates</p>
                  <h3 className="tw-text-2xl tw-font-bold tw-mt-1">50+</h3>
                </div>
                <div className="tw-w-12 tw-h-12 tw-rounded-lg tw-bg-gradient-to-br tw-from-[#f97316] tw-to-[#fb7185] tw-flex tw-items-center tw-justify-center tw-text-white">
                  <i className="bi bi-people-fill tw-text-lg"></i>
                </div>
              </div>
              <div className="tw-absolute tw-left-0 tw-bottom-0 tw-w-36 tw-h-28 tw-opacity-10" aria-hidden>
                <svg viewBox="0 0 100 100" className="tw-w-full tw-h-full">
                  <defs>
                    <linearGradient id="g2" x1="0" x2="1">
                      <stop offset="0" stopColor="#fb7185" />
                      <stop offset="1" stopColor="#f97316" />
                    </linearGradient>
                  </defs>
                  <rect x="10" y="10" width="80" height="80" rx="18" fill="url(#g2)" />
                </svg>
              </div>
            </div>

            <div className="tw-bg-white tw-rounded-2xl tw-p-5 tw-shadow-lg tw-relative overflow-hidden">
              <div className="tw-flex tw-justify-between tw-items-start">
                <div>
                  <p className="tw-text-sm tw-text-gray-500">Total Users</p>
                  <h3 className="tw-text-2xl tw-font-bold tw-mt-1">1,240</h3>
                </div>
                <div className="tw-w-12 tw-h-12 tw-rounded-lg tw-bg-gradient-to-br tw-from-[#10b981] tw-to-[#34d399] tw-flex tw-items-center tw-justify-center tw-text-white">
                  <i className="bi bi-person-badge-fill tw-text-lg"></i>
                </div>
              </div>
            </div>

            <div className="tw-bg-white tw-rounded-2xl tw-p-5 tw-shadow-lg tw-relative overflow-hidden">
              <div className="tw-flex tw-justify-between tw-items-start">
                <div>
                  <p className="tw-text-sm tw-text-gray-500">New Resumes</p>
                  <h3 className="tw-text-2xl tw-font-bold tw-mt-1">23</h3>
                </div>
                <div className="tw-w-12 tw-h-12 tw-rounded-lg tw-bg-gradient-to-br tw-from-[#a78bfa] tw-to-[#f472b6] tw-flex tw-items-center tw-justify-center tw-text-white">
                  <i className="bi bi-file-earmark-person-fill tw-text-lg"></i>
                </div>
              </div>
            </div>
          </section>

          {/* HIGHLIGHT AREA: Large Card with static mini-chart */}
          <section className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-6 tw-mb-6">
            <div className="tw-col-span-2 tw-bg-white tw-rounded-2xl tw-shadow-lg tw-p-6">
              <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
                <div>
                  <h3 className="tw-text-lg tw-font-semibold">Jobs Activity (last 6 months)</h3>
                  <p className="tw-text-xs tw-text-gray-500">Static sparkline showing trend</p>
                </div>
                <div className="tw-text-sm tw-text-gray-600 tw-font-medium">Active jobs: 110</div>
              </div>

              {/* Simple static SVG sparkline */}
              <div className="tw-h-28 tw-w-full">
                <svg viewBox="0 0 200 60" className="tw-w-full tw-h-full">
                  <polyline
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    points="0,45 25,40 50,30 75,28 100,20 125,25 150,18 175,12 200,8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    fill="none"
                    stroke="#7c3aed"
                    strokeWidth="1.5"
                    points="0,50 25,46 50,38 75,36 100,28 125,33 150,26 175,20 200,15"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="3 4"
                  />
                </svg>
              </div>
            </div>

            <div className="tw-bg-white tw-rounded-2xl tw-shadow-lg tw-p-6">
              <h3 className="tw-text-lg tw-font-semibold tw-mb-2">Quick Actions</h3>
              <div className="tw-flex tw-flex-col tw-gap-3">
                <button className="tw-w-full tw-text-left tw-px-4 tw-py-3 tw-rounded-lg tw-bg-gradient-to-r tw-from-[#06b6d4] tw-to-[#6366f1] tw-text-white tw-font-medium">
                  Post New Job
                </button>
                <button className="tw-w-full tw-text-left tw-px-4 tw-py-3 tw-rounded-lg tw-bg-gradient-to-r tw-from-[#f97316] tw-to-[#fb7185] tw-text-white tw-font-medium">
                  View Candidates
                </button>
                <button className="tw-w-full tw-text-left tw-px-4 tw-py-3 tw-rounded-lg tw-bg-gradient-to-r tw-from-[#10b981] tw-to-[#34d399] tw-text-white tw-font-medium">
                  Download Resumes
                </button>
              </div>
            </div>
          </section>

          {/* TABLE / LIST: Static Recent Jobs */}
          <section className="tw-bg-white tw-rounded-2xl tw-shadow-lg tw-p-6 tw-mb-6">
            <h3 className="tw-text-lg tw-font-semibold tw-mb-4">Recent Jobs (static)</h3>

            <div className="tw-overflow-x-auto">
              <table className="tw-w-full tw-text-left tw-border-collapse">
                <thead className="tw-bg-gray-50">
                  <tr>
                    <th className="tw-p-3 tw-text-xs tw-text-gray-600">Code</th>
                    <th className="tw-p-3 tw-text-xs tw-text-gray-600">Title</th>
                    <th className="tw-p-3 tw-text-xs tw-text-gray-600">Company</th>
                    <th className="tw-p-3 tw-text-xs tw-text-gray-600">Location</th>
                    <th className="tw-p-3 tw-text-xs tw-text-gray-600">Type</th>
                    <th className="tw-p-3 tw-text-xs tw-text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { code: "J-001", title: "Frontend Developer", comp: "Acme Inc.", loc: "Mumbai", type: "Full-time", status: "Active" },
                    { code: "J-002", title: "Product Designer", comp: "Pixel Labs", loc: "Bengaluru", type: "Contract", status: "Active" },
                    { code: "J-003", title: "Data Analyst", comp: "InsightX", loc: "Remote", type: "Remote", status: "Closed" },
                  ].map((r) => (
                    <tr key={r.code} className="tw-border-b">
                      <td className="tw-p-3 tw-text-sm tw-font-medium">{r.code}</td>
                      <td className="tw-p-3 tw-text-sm">{r.title}</td>
                      <td className="tw-p-3 tw-text-sm">{r.comp}</td>
                      <td className="tw-p-3 tw-text-sm">{r.loc}</td>
                      <td className="tw-p-3 tw-text-sm">{r.type}</td>
                      <td className="tw-p-3 tw-text-sm">{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="tw-text-center tw-text-xs tw-text-gray-400">
            © {new Date().getFullYear()} SmartHire — Static demo dashboard
          </footer>
        </main>
      </div>
    </div>
  );
}
