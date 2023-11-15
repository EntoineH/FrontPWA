import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function DashboardContent( {navigateToProject} ) {
  let navigate = useNavigate();
  const id = localStorage.getItem("id")
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(`https://pwa-backend-2c14dae9b4e4.herokuapp.com/projects/user/${id}`)
      .then((response) => {
        if (response.data.success === true) {
          setProjects(response.data.projects)
        }
      })
  }, []);

  const redirectToProject = (project) => {
    navigateToProject(project);
  };

  return (
    <div className="w-full">
      <div className="bg-indigo-500 rounded-xl shadow-md p-2 m-2">
        <h1 className="text-white text-2xl font-bold">Choose a project</h1>
      </div>

      <div className="flex flex-wrap justify-center h-screen">
        {projects.map((project) => (
          <div key={project._id} className="relative md:w-1/2 p-2 h-1/4">
            <div onClick={() => redirectToProject(project)} className="bg-white hover:bg-indigo-50 border-2 border-indigo-500 h-full overflow-hidden shadow-2xl rounded-3xl shadow-slate-600 relative cursor-pointer">
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
