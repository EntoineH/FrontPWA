import React, { useState } from "react";
import Modal from "react-modal";

const AddWorkspaceModal = ({ isOpen, onClose }) => {
  const [workSpaceName, setWorkspaceName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const allUsers = [
    { id: 1, name: "Albert Camé" },
    { id: 2, name: "Fedro Dos" },
    { id: 3, name: "Ulrick le Fric" },
    { id: 4, name: "Tipate Undent" },
    { id: 5, name: "Robert Camenbert" },
    { id: 6, name: "Luc Cul" },

    // Add more users as needed
  ];

  const handleUserSelect = (userId) => {
    // Toggle user selection
    setSelectedUsers((prevUsers) => {
      if (prevUsers.includes(userId)) {
        return prevUsers.filter((id) => id !== userId);
      } else {
        return [...prevUsers, userId];
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          zIndex: 9999, // Set a higher value for zIndex
        },
      }}
      className="flex items-center justify-center h-screen"
    >
      <div className="md:w-2/5 bg-white p-4 rounded-xl border border-gray-300">
        <div className="bg-indigo-500 rounded-lg shadow-md p-2">
          <h1 className="text-white text-2xl font-bold">Create new project</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="border-t my-2 border-gray-900/10 mb-2 block font-semibold">
            Project Name:
            <input
              type="text"
              value={workSpaceName}
              onChange={(event) => setWorkspaceName(event.target.value)}
              className="border border-gray-300 font-normal rounded w-full p-2"
            />
          </label>

          <label className="block mb-2 font-semibold">
            Select collaborators:
            <div className="border bg-gray-50 border-gray-300 rounded  max-h-40 overflow-y-auto">
              {allUsers.map((user) => (
                <div
                  key={user.id}
                  className="m-2 flex justify-between rounded items-center border hover:border-indigo-600 p-1 bg-gray-50 hover:bg-indigo-200"
                  onClick={() => handleUserSelect(user.id)}
                >
                  <span className="text-sm font-medium">{user.name}</span>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => {
                        handleUserSelect(user.id);
                      }}
                      className="form-checkbox accent-indigo-500"
                    />
                  </label>
                </div>
              ))}
            </div>
          </label>
          <div class="pt-2 flex items-center justify-end gap-x-6">
            <button
              type="button"
              class="text-sm font-semibold leading-6 text-gray-900"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddWorkspaceModal;
