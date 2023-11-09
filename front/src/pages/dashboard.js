import React from "react";
import DashboardContent from "./dashboardContent";
import Settings from "./settings";
import { useState } from "react";
import { useEffect } from "react";
import { Sidebar } from "../component/sideBar";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (activeTab === "dashboard") {
      setActiveTab("dashboard");
    } else if (activeTab === "settings") {
      setActiveTab("settings");
    }
  }, [activeTab]);

  return (
    <div className="flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="w-4/5">
        {activeTab === "dashboard" && <DashboardContent />}
        {activeTab === "settings" && <Settings />}
      </div>
    </div>
  );
};

export default Dashboard;
