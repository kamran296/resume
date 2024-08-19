import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEducation, addEducation } from "../Redux/educationSlice";

const EducationForm = () => {
  const dispatch = useDispatch();
  const education = useSelector((state) => state.education);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    dispatch(setEducation({ index, field: name, value }));
  };

  const handleAddEducation = () => {
    dispatch(addEducation());
  };

  return (
    <div>
      <form className="flex flex-col h-auto w-96 items-center  rounded-lg justify-center space-y-4 p-4">
        {education.map((edu, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <input
              type="text"
              name="University_Name"
              placeholder="University Name"
              value={edu.University_Name}
              onChange={(e) => handleChange(index, e)}
              className="p-2 border border-black rounded-lg"
            />
            <input
              type="text"
              name="Graduation_Date"
              placeholder="Graduation Date"
              value={edu.Graduation_Date}
              onChange={(e) => handleChange(index, e)}
              className="p-2 border border-black rounded-lg"
            />
            <input
              type="text"
              name="Degree"
              placeholder="Degree"
              value={edu.Degree}
              onChange={(e) => handleChange(index, e)}
              className="p-2 border border-black rounded-lg"
            />
            <input
              type="text"
              name="Department"
              placeholder="Department"
              value={edu.Department}
              onChange={(e) => handleChange(index, e)}
              className="p-2 border border-black rounded-lg"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddEducation}
          className="bg-blue-500 text-white p-2 rounded mt-4"
        >
          Add Education
        </button>
      </form>
    </div>
  );
};

export default EducationForm;
