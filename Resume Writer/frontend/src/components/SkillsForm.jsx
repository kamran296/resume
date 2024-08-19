import React from "react";
import { setSkills, addSkills } from "../Redux/skillsSlice";
import { useSelector, useDispatch } from "react-redux";

const SkillsForm = () => {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.skills); // Update this to correctly access your slice state

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    dispatch(setSkills({ field: name, value, index }));
  };

  const handleAddskills = () => {
    dispatch(addSkills());
  };

  return (
    <div>
      <form
        action=""
        className="flex flex-col h-auto w-96 items-center rounded-lg justify-center space-y-4 p-4"
      >
        {skills.map((skill, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <input
              type="text"
              name="Title"
              placeholder="Title"
              value={skill.ProjectTitle}
              onChange={(e) => handleChange(index, e)}
              className="p-2 border border-black rounded-lg"
            />
            <input
              type="text"
              name="Skills"
              placeholder="Skills"
              value={skill.Skills}
              onChange={(e) => handleChange(index, e)}
              className="p-2 border border-black rounded-lg"
            />
          </div>
        ))}
      </form>
      <div className="flex items-center justify-center m-2">
        <button
          onClick={handleAddskills}
          className="bg-blue-400 h-12 w-36 rounded-lg"
        >
          Add skills
        </button>
      </div>
    </div>
  );
};

export default SkillsForm;
