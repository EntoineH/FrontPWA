import React, { useState } from "react";
import Modal from "react-modal";

const AddWorkspaceModal = ({ isOpen, closeModal }) => {
  const [workSpaceName, setWorkspaceName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the taskName and taskDescription values
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="w-2/5 mx-auto bg-white p-4 rounded-xl border border-gray-300 h-2/4"
    >
      <div>
        <h2 class="text-2xl">Add Task</h2>
        <form onSubmit={handleSubmit}>
          <label class="mb-2">
            Task Name:
            <input
              type="text"
              value={workSpaceName}
              onChange={(event) => setWorkspaceName(event.target.value)}
              class="border border-gray-300 rounded w-full p-2"
            />
          </label>
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddWorkspaceModal;
