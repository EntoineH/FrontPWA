import React from "react";
import DashboardContent from "./dashboardContent";
import Settings from "./settings";
import { useState } from "react";
import { useEffect } from "react";
import SideBar from "../component/sideBar.js";
import { IconButton } from "@material-tailwind/react";
import * as cgIcon from "react-icons/cg";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (activeTab === "dashboard") {
      setActiveTab("dashboard");
    } else if (activeTab === "settings") {
      setActiveTab("settings");
    }
  }, [activeTab]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen w-full">
      {!sidebarOpen && (
        <IconButton
          variant="text"
          onClick={toggleSidebar}
          className="lg:hidden m-5"
        >
          <cgIcon.CgList size={30} />
        </IconButton>
      )}
      {sidebarOpen && (
        <SideBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          toggleSidebar={toggleSidebar}
        />
      )}
      <div className="w-4/5">
        {activeTab === "dashboard" && <DashboardContent />}
        {activeTab === "settings" && <Settings />}
      </div>
    </div>
  );
};

export default Dashboard;
