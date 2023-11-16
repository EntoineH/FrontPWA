import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateTaskModal = ({
  isOpen,
  onClose,
  usersInProject,
  taskId,
  usersInTask,
  taskTitle,
  taskDate,
  taskState,
  onUpdateTask,
}) => {
  const [title, setTitle] = useState(taskTitle);
  const [state, setState] = useState(taskState);
  const [dueDate, setDueDate] = useState(new Date(taskDate));
  const [selectedUsers, setSelectedUsers] = useState(usersInTask);
  const [users, setUsers] = useState(usersInProject);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUserSelect = (userId) => {
    // Toggle user selection
    setSelectedUsers((prevUsers) => {
      if (prevUsers.includes(userId)) {
        return prevUsers.filter((id) => id !== userId);
      } else {
        return [...prevUsers, userId];
      }
    });
    console.log(selectedUsers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedUsers.length === 0) {
      setErrorMessage("Please select at least one collaborator.");
      return;
    }
    axios
      .put(`https://pwa-backend-2c14dae9b4e4.herokuapp.com/tasks/${taskId}`, {
        title,
        users: selectedUsers,
        dueDate,
        state,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success === true) {
          // Update task in the list without reloading the page
          onUpdateTask({
            id: taskId,
            updatedTask: {
              title,
              users: users.filter((user) => selectedUsers.includes(user._id)),
              dueDate,
              state,
              _id: taskId
            },
          });
          onClose();
        }
      });
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
        <div className="bg-indigo-500 rounded-xl shadow-md p-2">
          <h1 className="text-white text-2xl font-bold">Update task</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="border-t my-3 border-gray-900/10 mb-2 block font-semibold">
            Task Name:
            <input
              type="text"
              value={title}
              required
              onChange={(event) => setTitle(event.target.value)}
              className="border border-gray-300 font-normal rounded w-full p-2"
            />
          </label>

          <label className="border-t my-3 border-gray-900/10 mb-2 block font-semibold">
            Task Status:
            <select
              value={state}
              onChange={(event) => setState(Number(event.target.value))}
              className="border border-gray-300 font-normal rounded w-full p-2"
            >
              <option value={0}>To Do</option>
              <option value={1}>In Progress</option>
              <option value={2}>Finished</option>
            </select>
          </label>

          <label className="border-t my-3 border-gray-900/10 mb-2 block font-semibold">
            Task Due Date:
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              dateFormat="yyyy-MM-dd"
              className="border border-gray-300 font-normal rounded w-full p-2"
            />
          </label>

          <label className="block mb-2 font-semibold">
            Assigned to:
            <div className="border bg-gray-50 border-gray-300 rounded  max-h-40 overflow-y-auto">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="m-2 flex justify-between rounded items-center border hover:border-indigo-500 p-1 bg-gray-50 hover:bg-indigo-100"
                  onClick={() => handleUserSelect(user._id)}
                >
                  <span className="text-sm font-medium">{user.username}</span>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => {
                        handleUserSelect(user._id);
                      }}
                      className="form-checkbox accent-indigo-500"
                    />
                  </label>
                  {errorMessage && (
                    <div className="text-red-500 mb-2">{errorMessage}</div>
                  )}
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
              className="rounded-xl bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateTaskModal;
