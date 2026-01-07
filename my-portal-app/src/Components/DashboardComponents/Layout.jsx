// import React from 'react';
// import Sidebar from './SideBar';
// import { Outlet } from 'react-router-dom';

// const Layout = () => {
//   return (
//     <div className="d-flex">
//       <Sidebar />
//       <div className="flex-grow-1 p-4">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Layout;




import React, { useState } from "react";
import Sidebar from "./SideBar";
import { Outlet } from "react-router-dom";
import { Bell, Search, Menu, Moon } from "lucide-react";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <div
        className={`bg-white shadow ${collapsed ? "d-none d-md-block" : ""}`}
        style={{
          width: collapsed ? "70px" : "240px",
          transition: "width 0.3s ease",
        }}
      >
        <Sidebar collapsed={collapsed} />
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm d-flex justify-content-between align-items-center px-4 py-2">
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-light d-md-none"
              onClick={() => setCollapsed(!collapsed)}
            >
              <Menu />
            </button>
            {/* Search Bar */}
            <div className="input-group rounded-pill shadow-sm">
              <span className="input-group-text bg-white border-0">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="form-control border-0"
              />
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <Moon className="cursor-pointer" />
            <Bell className="cursor-pointer" />
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="rounded-circle border"
              style={{ width: 40, height: 40 }}
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
