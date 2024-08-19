import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    University_Name: "",
    Graduation_Date: "",
    Degree: "",
    Department: "",
  },
];

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    setEducation: (state, action) => {
      const { index, field, value } = action.payload;
      state[index][field] = value;
    },
    addEducation: (state) => {
      state.push({
        University_Name: "",
        Graduation_Date: "",
        Degree: "",
        Department: "",
      });
    },
    setAllEducation: (state, action) => {
      return action.payload;
    },
  },
});

export const { setEducation, addEducation, setAllEducation } =
  educationSlice.actions;
export default educationSlice.reducer;
