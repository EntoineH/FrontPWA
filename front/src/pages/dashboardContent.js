import React from "react";

function DashboardContent() {
  const projects = [
    { id: 1, name: "Flutter", description: "10/04/2023" },
    { id: 2, name: "Web app", description: "10/04/2023" },
    { id: 3, name: "Angular project", description: "10/04/2023" },
    { id: 4, name: "C++", description: "10/04/2023" },
    { id: 5, name: "Python scraping", description: "10/04/2023" },
    { id: 6, name: "Projec test", description: "10/04/2023" },
    { id: 7, name: "EIP Project", description: "10/04/2023" },
    { id: 8, name: "Project 8", description: "10/04/2023" },
    { id: 9, name: "Project 9", description: "10/04/2023" },
    { id: 10, name: "Project 10", description: "10/04/2023" },
    { id: 11, name: "Project 11", description: "10/04/2023" },
    { id: 12, name: "Project 12", description: "10/04/2023" },
  ];

  const avatars = ["UT", "AB", "CD", "EF", "GH"];

  const handleProjectClick = (id, name) => {
    console.log(`Clicked on project ${id}: ${name}`);
  };

  return (
    <div className="w-full">
      <div className="bg-indigo-500 rounded-xl shadow-md p-2 m-2">
        <h1 className="text-white text-2xl font-bold">Choose a project</h1>
      </div>

      <div className="flex flex-wrap justify-center h-screen">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative md:w-1/2 w-full p-2 md:h-1/4 h-1/5"
            onClick={() => handleProjectClick(project.id, project.name)}
          >
            <div className="bg-white hover:bg-indigo-50 border-2 border-indigo-500 h-full overflow-hidden shadow-2xl rounded-3xl shadow-slate-600 relative">
              <div className="p-4">
                <h2 className="text-indigo-500 font-bold text-2xl">
                  {project.name}
                </h2>
                <p className="mt-2 text-gray-600 italic">
                  {project.description}
                </p>
              </div>

              <div className="absolute bottom-2 right-2 flex flex-row">
                {avatars.slice(0, 3).map((avatar, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full bg-indigo-400 text-white flex justify-center items-center text-sm font-bold"
                    style={{ zIndex: avatars.length - index }}
                  >
                    {avatar}
                  </div>
                ))}
                {avatars.length > 3 && (
                  <div
                    className="w-8 h-8 rounded-full bg-indigo-100 text-white flex justify-center items-center text-sm font-bold"
                    style={{ zIndex: avatars.length - 3 }}
                  >
                    +{avatars.length - 3}
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
