import React from "react";
import { Avatar, Typography } from "@material-tailwind/react";
//import * as cgIcon from "react-icons/cg";
import { CiCirclePlus } from "react-icons/ci";
import Column from "../component/columnTask";
import Task from "../component/task";

//ajouter les boutons pour editer et supprimer les taches

const Project = (project, onClose) => {
  console.log("project === ", project)
  const tasks = [
    {
      id: 1,
      title: "Tâche 1 test",
      date: "2023-01-01",
      collaborators: [
        { id: 1, name: "Utilisateur 1", avatar: "/path/to/avatar1.jpg" },
      ],
      status: 0,
    },
    {
      id: 2,
      title: "Tâche 2",
      date: "2023-01-02",
      collaborators: [
        { id: 1, name: "Utilisateur 1", avatar: "/path/to/avatar1.jpg" },
      ],
      status: 1,
    },
    {
      id: 3,
      title: "Tâche 3",
      date: "2023-01-03",
      collaborators: [
        { id: 1, name: "Utilisateur 1", avatar: "/path/to/avatar1.jpg" },
      ],
      status: 2,
    },
    // ... Ajoutez d'autres tâches
  ];

  const tasksByStatus = tasks.reduce(
    (acc, task) => {
      acc[task.status].push(task);
      return acc;
    },
    [[], [], []]
  );

  const projectName = "Nom du Projet"; // Remplacez cela par le nom de votre projet

  // Exemple d'utilisateurs affiliés au projet
  const projectMembers = [
    { id: 1, name: "Utilisateur 1", avatar: "/path/to/avatar1.jpg" },
    { id: 2, name: "Utilisateur 2", avatar: "/path/to/avatar2.jpg" },
    // ... Ajoutez d'autres utilisateurs au besoin
  ];

  return (
    <div className="p-8">
      <Typography variant="h1" color="blue-gray" className="mb-4">
        {project.project.title}
      </Typography>

      <div className="flex space-x-4 mb-6">
        {projectMembers.map((member) => (
          <Avatar
            key={member.id}
            src={member.avatar}
            alt={member.name}
            size="lg"
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[0, 1, 2].map((status) => (
          <Column
            key={status}
            title={
              status === 0 ? "À Faire" : status === 1 ? "En cours" : "Terminé"
            }
          >
            {tasksByStatus[status].map((task) => (
              <Task
                key={task.id}
                title={task.title}
                date={task.date}
                collaborators={task.collaborators}
                status={task.status}
                onStatusChange={() => {}}
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
    </div>
  );
};

export default Project;
