import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function DashboardContent({ navigateToProject }) {
  const myId = localStorage.getItem("id");
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const username = localStorage.getItem("username");

  useEffect(() => {
    axios
      .get(`https://pwa-backend-2c14dae9b4e4.herokuapp.com/projects/user/${myId}`)
      .then((response) => {
        if (response.data.success === true) {
          setProjects(response.data.projects);
        }
      });
  }, [myId]);

  const redirectToProject = (project) => {
    navigateToProject(project);
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    // Add your delete logic here for the projectToDelete
    // After deleting, close the modal and reset projectToDelete
    setShowModal(false);
    axios
    .delete(`https://pwa-backend-2c14dae9b4e4.herokuapp.com/projects/${projectToDelete._id}`)
    .then((response) => {
      if (response.data.success === true) {
        axios
            .post(`https://pwa-backend-2c14dae9b4e4.herokuapp.com/notifyUsers`, {
              users: projectToDelete.users.map((user) => user._id).filter((id) => id !== myId),
              title: "Project deleted",
              body: `${username} delete the project ${projectToDelete.title}`,
              redirectUrl: "https://front-pwa-eight.vercel.app/dashboard"
            })
            .then((response) => {
              console.log(response)
            });
        window.location.reload(false);
      }
    });
    setProjectToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setProjectToDelete(null);
  };

  return (
    <div className="w-full">
      <div className="bg-indigo-500 rounded-xl shadow-md p-2 m-2">
        <h1 className="text-white text-2xl font-bold">Choose a project</h1>
      </div>

      <div className="flex flex-wrap justify-center h-screen">
        {showModal && projectToDelete && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
            style={{ zIndex: 500 }}
          >
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold mb-4">
                Are you sure you want to delete {projectToDelete.title} ?
              </h2>
              <div className="flex justify-end">
                <button
                  onClick={handleCancelDelete}
                  className=" rounded-xl bg-white hover:bg-indigo-50 px-3 py-2 text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="ml-1 rounded-xl bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
        {projects.map((project) => (
          <div
            key={project._id}
            className="relative md:w-1/2 w-full p-2 md:h-1/4 h-1/5"
          >
            <div
              onClick={() => redirectToProject(project)}
              className="bg-white hover:bg-indigo-50 border-2 border-indigo-500 h-full overflow-hidden shadow-2xl rounded-3xl shadow-slate-600 relative cursor-pointer"
            >
              <div className="absolute top-3 right-3">
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(project); // Open modal when delete icon is clicked
                  }}
                />
              </div>
              <div className="p-4">
                <h2 className="text-indigo-500 font-bold text-2xl">
                  {project.title}
                </h2>
                <p className="mt-2 text-gray-600 italic">
                  {new Date(project.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="absolute bottom-2 right-2 flex flex-row">
                {project.users.map((user, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full bg-indigo-400 text-white flex justify-center items-center text-sm font-bold"
                    style={{ zIndex: project.users.length - index }}
                    title={user.username}
                  >
                    {user.username.substring(0, 1).toUpperCase()}
                  </div>
                ))}
                {project.users.length > 3 && (
                  <div
                    className="w-8 h-8 rounded-full bg-indigo-100 text-white flex justify-center items-center text-sm font-bold"
                    style={{ zIndex: project.users.length - 3 }}
                  >
                    +{project.users.length - 3}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardContent;
