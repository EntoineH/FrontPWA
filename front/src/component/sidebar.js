import React from "react";
import { Link } from "react-router-dom";
import * as icon from "react-icons/fa";
import * as cgIcon from "react-icons/cg";
import IconButton from "@mui/material/Button";
import AddWorkspaceModal from "./addWorkspaceModal";

const Sidebar = ({ activeTab, onTabChange }) => {
  const [modalWorkspaceIsOpen, setModalWorkspaceIsOpen] = React.useState(false);

  const handleOpenModal = () => {
    setModalWorkspaceIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalWorkspaceIsOpen(false);
  };
  return (
    <div className="h-screen w-1/5 p-4 shadow-md block fixed">
      <div className="flex border-b-2 items-center pt-4 pb-4">
        <img
          src="../OrganizeMeIcon.png"
          alt="logo"
          className="w-16 rounded-md mr-6"
        />
        <h2 className="font-bold text-2xl">OrganizeMe</h2>
      </div>
      <ul className="flex-col pt-4 ml-4 mr-10">
        <li
          className={
            activeTab === "dashboard"
              ? "mb-1 p-3 active bg-gray-200 rounded-md"
              : "mb-1 p-3"
          }
        >
          <Link
            onClick={() => onTabChange("dashboard")}
            className="flex text-xl font-medium items-center"
          >
            <icon.FaHome size={30} className="text-gray-400" />
            <span className="ml-4 text-gray-400">Dashboard</span>
          </Link>
        </li>
        <li
          className={
            activeTab === "settings"
              ? "mb-1 p-3 active bg-gray-200 rounded-md"
              : "mb-1 p-3"
          }
        >
          <Link
            onClick={() => onTabChange("settings")}
            className="flex text-xl font-medium items-center"
          >
            <icon.FaCog size={30} className="text-gray-400" />
            <span className="ml-4 text-gray-400">Settings</span>
          </Link>
        </li>
      </ul>
      <div className="row border-t-2 items-center pt-4 pb-4 mt-4 pl-4">
        <span className="text-gray-400 font-bold text-sm">WORKSPACES</span>
        <IconButton onClick={handleOpenModal}>
          <cgIcon.CgAddR size={20} className="text-gray-400 ml-24" />
        </IconButton>
      </div>
      {modalWorkspaceIsOpen && (
        <AddWorkspaceModal
          isOpen={modalWorkspaceIsOpen}
          closeModal={handleCloseModal}
        />
      )}
    </div>
  );
};
export default Sidebar;
