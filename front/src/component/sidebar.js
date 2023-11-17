import React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  Typography,
  ListItem,
  List,
  ListItemPrefix,
  ListItemSuffix,
  IconButton,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import * as cgIcon from "react-icons/cg";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import axios from "axios";

function SideBar({
  activeTab,
  onTabChange,
  toggleSidebar,
  openAddWorkspaceModal,
  navigateToProject,
  sidebarOpen,
}) {
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

  return (
    <Card className="fixed z-50 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 overflow-hidden">
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
      <List>
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
    </Card>
  );
}

export default SideBar;
