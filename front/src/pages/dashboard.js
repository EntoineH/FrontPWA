import React, { useState, useEffect } from "react";
import { IconButton } from "@material-tailwind/react";
import * as cgIcon from "react-icons/cg";
import AddWorkspaceModal from "../component/addWorkspaceModal";
import DashboardContent from "./dashboardContent";
import Settings from "./settings";
import SideBar from "../component/sidebar.js";
import Project from "./project.js";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAddWorkspaceModal, setShowAddWorkspaceModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const openAddWorkspaceModal = () => {
    setShowAddWorkspaceModal(true);
  };

  const closeAddWorkspaceModal = () => {
    setShowAddWorkspaceModal(false);
  };

  const navigateToProject = (project) => {
    setSelectedProject(project);
    setActiveTab("project");
  };

  useEffect(() => {
    if (activeTab === "dashboard") {
      setSelectedProject([]); // Reset selected project when navigating to the dashboard
    }
  }, [activeTab]);

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
          openAddWorkspaceModal={openAddWorkspaceModal}
          navigateToProject={navigateToProject}
        />
      )}
      <div className="w-4/5">
        {activeTab === "dashboard" && <DashboardContent navigateToProject={navigateToProject}/>}
        {activeTab === "settings" && <Settings />}
        {activeTab === "project" && (
          <Project project={selectedProject} onClose={() => setActiveTab("dashboard")} />
        )}
      </div>
      {showAddWorkspaceModal && (
        <AddWorkspaceModal
          isOpen={showAddWorkspaceModal}
          onClose={closeAddWorkspaceModal}
        />
      )}
    </div>
  );
};

export default Dashboard;
