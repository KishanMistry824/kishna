



import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  User,
  Briefcase,
  // Bookmark,
  // BarChart3,
  //Settings,
  LogOut,
  Menu,
} from "lucide-react";

const menuItems = [
  { path: "/dashboard", label: "Profile", icon: User, exact: true },
  { path: "/dashboard/job-feed", label: "Job Feed", icon: Briefcase },
  // { path: "/dashboard/application-tracker", label: "Application Tracker", icon: BarChart3 },
  // { path: "/dashboard/saved-jobs", label: "Saved Jobs", icon: Bookmark },
 // { path: "/dashboard/settings", label: "Settings", icon: Settings },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className="custom-sidebar d-flex flex-column justify-content-between vh-100 shadow-sm"
      style={{
        width: collapsed ? "70px" : "240px",
        transition: "width 0.3s ease",
      }}
    >
      {/* Toggle Button */}
      <div className="sidebar-header d-flex justify-content-end p-3 border-bottom">
        <button
          className="btn btn-sm sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Navigation */}
      <ul className="sidebar-nav flex-column flex-grow-1 mt-2" style={{ margin: 0, padding: 0 }}>
        {menuItems.map(({ path, label, icon: Icon, exact }) => (
          <li key={path} className="sidebar-item" style={{ listStyle: "none" }}>
            <NavLink
              to={path}
              end={exact}
              className={({ isActive }) =>
                `sidebar-link d-flex align-items-center gap-3 py-3 px-3 rounded-3 my-1 
                 ${isActive ? "sidebar-link-active" : ""}`
              }
              style={{ cursor: "pointer", textDecoration: "none" }}
            >
              <Icon size={20} />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="sidebar-footer border-top p-3">
        <button className="btn btn-outline-dark btn-sm w-100 rounded-pill">
          <LogOut size={16} />
          {!collapsed && <span className="ms-2">Logout</span>}
        </button>
      </div>

      {/* Scoped CSS */}
      <style>{`
        .custom-sidebar {
          background-color: #ffffff;
          color: #212529;
        }
        .sidebar-nav {
          list-style: none;
          padding-left: 0;
        }
        .sidebar-link {
          color: #495057;
          font-weight: 500;
          position: relative;
          transition: all 0.3s ease;
        }
        .sidebar-link:hover {
          background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
          color: #ffffff !important;
          transform: translateX(3px) scale(1.02);
          box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
        }
        .sidebar-link-active {
          background: linear-gradient(90deg, #0072ff 0%, #005bb5 100%);
          font-weight: 600;
          color: #ffffff !important;
          border-left: 4px solid #00c6ff;
          box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
        }
        .sidebar-toggle {
          color: #212529;
          background: transparent;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
