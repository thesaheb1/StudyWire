import React from "react";
import Sidebar from "../../components/Dashboard/SideBar/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex justify-between items-start">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
