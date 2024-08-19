import React from "react";
import { setExtra, addExtra } from "../Redux/extraSlice";
import { useSelector, useDispatch } from "react-redux";

const ExtraForm = () => {
  const dispatch = useDispatch();
  const extras = useSelector((state) => state.extra); // Update this to correctly access your slice state

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    dispatch(setExtra({ field: name, value, index }));
  };

  const handleAddExtra = () => {
    dispatch(addExtra());
  };

  return (
    <div>
      <form
        action=""
        className="flex flex-col h-auto w-96 items-center  rounded-lg justify-center space-y-4 p-4"
      >
        {extras.map((extra, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <input
              type="text"
              name="Title"
              placeholder="Title"
              value={extra.Title}
              onChange={(e) => handleChange(index, e)}
              className="p-2 border border-black rounded-lg"
            />
            <input
              type="text"
              name="Description"
              placeholder="Description"
              value={extra.Description}
              onChange={(e) => handleChange(index, e)}
              className="p-2 border border-black rounded-lg"
            />
          </div>
        ))}
      </form>
      <div className="flex items-center justify-center m-2">
        <button
          onClick={handleAddExtra}
          className="bg-blue-400 h-12 w-36 rounded-lg"
        >
          Add extras
        </button>
      </div>
    </div>
  );
};

export default ExtraForm;
