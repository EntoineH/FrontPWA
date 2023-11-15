import React, { useState } from "react";
import { Avatar, Typography } from "@material-tailwind/react";
//import * as cgIcon from "react-icons/cg";
import { CiCirclePlus } from "react-icons/ci";
import { CgChevronLeft } from "react-icons/cg";
import { BsPencil } from "react-icons/bs"; 
import Column from "../component/columnTask";
import Task from "../component/task";
import UpdateWorkspaceModal from "../component/updateWorkspaceModal";


//ajouter les boutons pour editer et supprimer les taches

const Project = (project, onClose) => {
  const [showUpdateWorkspaceModal, setShowUpdateWorkspaceModal] = useState(false);
  const tasks = project.project.tasks

  const openUpdateWorkspaceModal = () => {
    setShowUpdateWorkspaceModal(true);
  };

  const closeUpdateWorkspaceModal = () => {
    setShowUpdateWorkspaceModal(false);
  };

  const tasksByStatus = tasks.reduce(
    (acc, task) => {
      acc[task.state].push(task);
      return acc;
    },
    [[], [], []]
  );

  return (
    <div className="p-8">
      <div
        className="cursor-pointer mb-4"
        onClick={project.onClose}
      >
        <CgChevronLeft size={25} />
      </div>
      <div className="flex items-center mb-4">
        <Typography variant="h1" color="blue-gray">
          {project.project.title}
        </Typography>
        <button
          className="ml-2 p-1 hover:bg-gray-200 rounded-full"
          onClick={openUpdateWorkspaceModal}
        >
          <BsPencil size={20} />
        </button>
      </div>

      <div className="flex flex-row ">
        {project.project.users.map((user, index) => (
          <div
            key={index}
            className="w-8 h-8 rounded-full bg-indigo-400 text-white flex justify-center items-center text-sm font-bold"
            title={user.username}
          >
            {user.username.substring(0, 1).toUpperCase()}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[0, 1, 2].map((state) => (
          <Column
            key={state}
            title={
              state === 0 ? "À Faire" : state === 1 ? "En cours" : "Terminé"
            }
          >
            {tasksByStatus[state].map((task) => (
              <Task
                key={task.id}
                title={task.title}
                date={new Date(task.dueDate).toLocaleDateString()}
                collaborators={task.users}
                status={task.state}
                onStatusChange={() => { }}
              />
            ))}
          </Column>
        ))}
      </div>

      <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-20">
        <button className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded-xl">
          <CiCirclePlus size={25} />
          <span className="ml-2">Nouvelle tâche</span>
        </button>
      </div>
      {showUpdateWorkspaceModal && (
        <UpdateWorkspaceModal
          isOpen={showUpdateWorkspaceModal}
          onClose={closeUpdateWorkspaceModal}
          usersInProject={project.project.users.map(user => user._id)}
          projectTitle={project.project.title}
          projectId={project.project._id}
        />
      )}
    </div>
  );
};

export default Project;
