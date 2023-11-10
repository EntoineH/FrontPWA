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

function SideBar({ activeTab, onTabChange, toggleSidebar }) {
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
          Projects
          <ListItemSuffix>
            <IconButton variant="text" color="blue-gray">
              <cgIcon.CgAddR size={20} />
            </IconButton>
          </ListItemSuffix>
        </ListItem>
      </List>
    </Card>
  );
}

export default SideBar;
