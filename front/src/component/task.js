import React, { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import UpdateTaskModal from "../component/updateTaskModal";

const Task = ({
  title,
  date,
  collaborators,
  taskId,
  usersInProject,
  state,
  onDeleteTask,
  onUpdateTask,
}) => {
  const myId = localStorage.getItem("id");
  const username = localStorage.getItem("username");
  const deleteTask = () => {
    axios
      .delete(`https://pwa-backend-2c14dae9b4e4.herokuapp.com/tasks/${taskId}`)
      .then((response) => {
        if (response.data.success === true) {
          onDeleteTask(taskId);
          axios
            .post(
              `https://pwa-backend-2c14dae9b4e4.herokuapp.com/notifyUsers`,
              {
                users: collaborators
                  .map((collaborator) => collaborator._id)
                  .filter((id) => id !== myId),
                title: "Task deleted",
                body: `${username} delete the task ${title}`,
                redirectUrl: "https://front-pwa-eight.vercel.app/dashboard",
              }
            )
            .then((response) => {
              console.log(response);
            });
        }
      });
  };

  const [showUpdateTaskModal, setShowUpdateTaskModal] = useState(false);

  const openUpdateTaskModal = () => {
    setShowUpdateTaskModal(true);
  };

  const closeUpdateTaskModal = () => {
    setShowUpdateTaskModal(false);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <Typography variant="h6" color="blue-gray" className="mb-2">
        {title}
      </Typography>
      <Typography variant="body2" color="gray">
        Date: {new Date(date).toLocaleDateString()}
      </Typography>
      <div className="flex flex-row ">
        {collaborators.map((collaborator, index) => (
          <div
            key={index}
            className="w-8 h-8 rounded-full bg-indigo-400 text-white flex justify-center items-center text-sm font-bold"
            title={collaborator.username}
          >
            {collaborator?.username?.substring(0, 1).toUpperCase()}
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row space-x-4">
        <div className="flex justify-end mt-4">
          <Button
            color="blue"
            onClick={openUpdateTaskModal}
            ripple="light"
            className="rounded-full"
          >
            Modify
          </Button>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            color="red"
            onClick={deleteTask}
            ripple="light"
            className="rounded-full"
          >
            Delete
          </Button>
        </div>
      </div>
      {showUpdateTaskModal && (
        <UpdateTaskModal
          isOpen={showUpdateTaskModal}
          onClose={closeUpdateTaskModal}
          usersInProject={usersInProject}
          taskId={taskId}
          usersInTask={collaborators.map((collaborator) => collaborator._id)}
          taskTitle={title}
          taskDate={date}
          taskState={state}
          onUpdateTask={onUpdateTask}
        />
      )}
    </div>
  );
};

export default Task;
