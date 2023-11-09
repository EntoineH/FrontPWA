import React from "react";
import Sidebar from "../component/sidebar";
import DashboardContent from "./dashboardContent";
import Settings from "./settings";
import { useState } from "react";
import { useEffect } from "react";

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
      <div className="w-1/5">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <div className="w-4/5">
        {activeTab === "dashboard" && <DashboardContent />}
        {activeTab === "settings" && <Settings />}
      </div>
    </div>
  );
};

export default Dashboard;
