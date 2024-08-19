import React from "react";
import { setWorkExperience, addWork } from "../Redux/workSlice";
import { useSelector, useDispatch } from "react-redux";

const WorkExpForm = () => {
  const dispatch = useDispatch();
  const works = useSelector((state) => state.work); // Update this to correctly access your slice state

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    dispatch(setWorkExperience({ field: name, value, index }));
  };

  const handleAddworks = () => {
    dispatch(addWork());
  };

  return (
    <div>
      <form
        action=""
        className="flex flex-col h-auto w-96 items-center  rounded-lg justify-center space-y-4 p-4"
      >
        {works.map((work, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <input
              type="text"
              name="Title"
              placeholder="Title"
              value={work.Title}
              onChange={(e) => handleChange(index, e)}
              className="p-2 border border-black rounded-lg"
            />
            <input
              type="text"
              name="Date"
              placeholder="Date"
              value={work.Date}
              onChange={(e) => handleChange(index, e)}
              className="p-2 border border-black rounded-lg"
            />
            <input
              type="text"
              name="Company"
              placeholder="Company"
              value={work.Company}
              onChange={(e) => handleChange(index, e)}
              className="p-2 border border-black rounded-lg"
            />
            <textarea
              name="Description"
              placeholder="Description"
              value={work.Description}
              onChange={(e) => handleChange(index, e)}
              className="p-2 border border-black rounded-lg"
            />
          </div>
        ))}
      </form>
      <div className="flex items-center justify-center m-2">
        <button
          className="bg-blue-400 h-12 w-36 rounded-lg"
          onClick={handleAddworks}
        >
          Add works
        </button>
      </div>
    </div>
  );
};

export default WorkExpForm;
