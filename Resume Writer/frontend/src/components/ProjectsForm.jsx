import React from "react";
import { setProjects, addProjects } from "../Redux/projectsSlice";
import { useSelector, useDispatch } from "react-redux";

const ProjectsForm = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects); // Update this to correctly access your slice state

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    dispatch(setProjects({ field: name, value, index }));
  };

  const handleAddProjects = () => {
    dispatch(addProjects());
  };

  return (
    <div>
      <form
        action=""
        className="flex flex-col h-auto w-96 items-center  justify-center space-y-4 p-4"
      >
        {projects.map((proj, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <input
              type="text"
              name="ProjectTitle"
              placeholder="Project Title"
              value={proj.ProjectTitle}
              onChange={(e) => handleChange(index, e)}
              className="p-2 border border-black rounded-lg"
            />
            <input
              type="text"
              name="Year"
              placeholder="Year"
              value={proj.Year}
              onChange={(e) => handleChange(index, e)}
              className="p-2 border border-black rounded-lg"
            />
            <input
              type="text"
              name="Role"
              placeholder="Role"
              value={proj.Role}
              onChange={(e) => handleChange(index, e)}
              className="p-2 border border-black rounded-lg"
            />
            <input
              type="text"
              name="Location"
              placeholder="Location"
              value={proj.Location}
              onChange={(e) => handleChange(index, e)}
              className="p-2 border border-black rounded-lg"
            />
            <textarea
              name="Description"
              placeholder="Description"
              value={proj.Description}
              onChange={(e) => handleChange(index, e)}
              className="p-2 border border-black rounded-lg"
            />
          </div>
        ))}
      </form>
      <div className="flex items-center justify-center m-2">
        <button
          onClick={handleAddProjects}
          className="bg-blue-400 h-12 w-36 rounded-lg"
        >
          Add Projects
        </button>
      </div>
    </div>
  );
};

export default ProjectsForm;
