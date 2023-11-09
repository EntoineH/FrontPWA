import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import AddTaskModal from "../component/addTaskModal";

function DashboardContent() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="w-full bg-black">
      <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-20">
        <button
          onClick={handleOpenModal}
          className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded-xl"
        >
          <CiCirclePlus size={25} />
          <span className="ml-2">Nouvelle tâche</span>
        </button>
      </div>
      {modalIsOpen && (
        <AddTaskModal isOpen={modalIsOpen} closeModal={handleCloseModal} />
      )}
    </div>
  );
}

export default DashboardContent;
