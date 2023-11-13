import React from "react";
import { useState } from "react";
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

function SideBar({
  activeTab,
  onTabChange,
  toggleSidebar,
  openAddWorkspaceModal,
}) {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
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
        <ListItem ripple={false}>
          Add a project
          <ListItemSuffix>
            <IconButton variant="text" color="blue-gray">
              <cgIcon.CgAddR size={20} onClick={openAddWorkspaceModal} />
            </IconButton>
          </ListItemSuffix>
        </ListItem>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Projects
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>Analytics</ListItem>
            </List>
          </AccordionBody>
        </Accordion>
      </List>
    </Card>
  );
}

export default SideBar;
