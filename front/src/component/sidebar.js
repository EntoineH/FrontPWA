import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  ListItem,
  List,
  ListItemPrefix,
  ListItemSuffix,
  IconButton,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import * as cgIcon from "react-icons/cg";
import { PowerIcon } from "@heroicons/react/24/outline";
import axios from "axios";

function SideBar({
  activeTab,
  onTabChange,
  toggleSidebar,
  openAddWorkspaceModal,
  navigateToProject,
  sidebarOpen,
}) {
  let navigate = useNavigate();
  const id = localStorage.getItem("id");
  const [open, setOpen] = useState(0);
  const [projects, setProjects] = useState([]);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    axios
      .get(`https://pwa-backend-2c14dae9b4e4.herokuapp.com/projects/user/${id}`)
      .then((response) => {
        if (response.data.success === true) {
          setProjects(response.data.projects);
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("projects");
    navigate("/");
  };

  return (
    <Card className="fixed z-50 h-screen p-4 shadow-xl shadow-blue-gray-900/5 overflow-hidden">
      <div className="mb-2 p-4">
        <div className="mb-2 flex items-center gap-4 p-4">
          <img src="../OrganizeMeIcon.png" alt="brand" className="h-8 w-8" />
          <Typography variant="h5" color="blue-gray">
            OrganizeMe
          </Typography>
          <IconButton
            variant="text"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <cgIcon.CgCloseR size={20} />
          </IconButton>
        </div>
      </div>
      <List className="flex-grow">
        <ListItem onClick={() => onTabChange("dashboard")}>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem onClick={() => onTabChange("settings")}>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem ripple={false} onClick={openAddWorkspaceModal}>
          Add a project
          <ListItemSuffix>
            <cgIcon.CgAddR size={20} />
          </ListItemSuffix>
        </ListItem>
      </List>
      <List>
        <ListItem className="text-red-500" onClick={logout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5 text-red-500" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}

export default SideBar;
