// import React from "react";
// import { setPersonalInfo } from "../Redux/personalInfoSlice";
// import { useSelector, useDispatch } from "react-redux";

// const PersonalForm = () => {
//   const dispatch = useDispatch();
//   const personalInfo = useSelector((state) => state.personalInfo);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     dispatch(setPersonalInfo({ name, value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Dispatch action or handle the form submission here
//   };

//   return (
//     <div>
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col h-auto w-96 items-center border-2 border-gray-400 rounded-lg justify-center space-y-4 p-4"
//       >
//         <label htmlFor="Name">Name</label>
//         <input
//           type="text"
//           name="Name"
//           placeholder="Name"
//           value={personalInfo.Name}
//           onChange={handleChange}
//           className="p-2 border border-black rounded-lg"
//         />
//         <label htmlFor="Address">Address</label>
//         <input
//           type="text"
//           name="Address"
//           placeholder="Address"
//           value={personalInfo.Address}
//           onChange={handleChange}
//           className="p-2 border border-black rounded-lg"
//         />
//         <label htmlFor="Phone">Phone</label>
//         <input
//           type="text"
//           name="Phone"
//           placeholder="Phone"
//           value={personalInfo.Phone}
//           onChange={handleChange}
//           className="p-2 border border-black rounded-lg"
//         />
//         <label htmlFor="Email">Email</label>
//         <input
//           type="email"
//           name="Email"
//           placeholder="Email"
//           value={personalInfo.Email}
//           onChange={handleChange}
//           className="p-2 border border-black rounded-lg"
//         />
//       </form>
//     </div>
//   );
// };

// export default PersonalForm;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPersonalInfo } from "../Redux/personalInfoSlice";

const PersonalForm = () => {
  const dispatch = useDispatch();
  const personalInfo = useSelector((state) => state.personalInfo);
  console.log("personalIngo", personalInfo);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setPersonalInfo({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission if needed
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col h-auto w-96 items-center rounded-lg justify-center space-y-4 p-4"
    >
      <label htmlFor="Name">Name</label>
      <input
        type="text"
        name="Name"
        placeholder="Name"
        value={personalInfo.Name}
        onChange={handleChange}
        className="p-2 border border-black rounded-lg"
      />
      <label htmlFor="Address">Address</label>
      <input
        type="text"
        name="Address"
        placeholder="Address"
        value={personalInfo.Address}
        onChange={handleChange}
        className="p-2 border border-black rounded-lg"
      />
      <label htmlFor="Phone">Phone</label>
      <input
        type="text"
        name="Phone"
        placeholder="Phone"
        value={personalInfo.Phone}
        onChange={handleChange}
        className="p-2 border border-black rounded-lg"
      />
      <label htmlFor="Email">Email</label>
      <input
        type="email"
        name="Email"
        placeholder="Email"
        value={personalInfo.Email}
        onChange={handleChange}
        className="p-2 border border-black rounded-lg"
      />
    </form>
  );
};

export default PersonalForm;
