import React from "react";
import Sidebar from "./SideBar";
import { Outlet } from 'react-router-dom';

const CandidateDashboard = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default CandidateDashboard;
