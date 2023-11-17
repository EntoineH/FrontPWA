import React, { useState, useEffect } from "react";
import { IconButton } from "@material-tailwind/react";
import * as cgIcon from "react-icons/cg";
import AddWorkspaceModal from "../component/addWorkspaceModal";
import DashboardContent from "./dashboardContent";
import Settings from "./settings";
import SideBar from "../component/sidebar.js";
import Project from "./project.js";
import axios from "axios";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAddWorkspaceModal, setShowAddWorkspaceModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState([]);
  const id = localStorage.getItem("id");

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

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const buffer = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      buffer[i] = rawData.charCodeAt(i);
    }

    return buffer;
  }

  const subscribeUserToPush = () => {
    navigator.serviceWorker.ready.then(async (registration) => {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BOUfXxr7xEFzcjeXmvOFvbdsXosthzgbO5pyAUTWJ76XQ2fOLP0iau6ptvpdNyOVf-inaM3JIr9dXIE5f3oV3uE"
        ),
      });

      axios
        .post(
          `https://pwa-backend-2c14dae9b4e4.herokuapp.com/subscribe/${id}`,
          {
            subscription: subscription,
          }
        )
        .then((response) => {});
    });
  };

  useEffect(() => {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        // Notifications are allowed
        subscribeUserToPush()
      } else if (Notification.permission === "denied") {
        // Notifications are blocked
      } else {
        // Notifications are not denied or granted yet, can prompt the user
      }
    }
  }, []);

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
        {activeTab === "dashboard" && (
          <DashboardContent navigateToProject={navigateToProject} />
        )}
        {activeTab === "settings" && <Settings />}
        {activeTab === "project" && (
          <Project
            project={selectedProject}
            onClose={() => setActiveTab("dashboard")}
          />
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
