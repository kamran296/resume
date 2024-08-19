import { createSlice } from "@reduxjs/toolkit";

const initialState = [{ TITLE: "", Skills: "" }];

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    setSkills: (state, action) => {
      const { index, field, value } = action.payload;
      state[index][field] = value;
    },
    addSkills: (state) => {
      state.push({ TITLE: "", Skills: "" });
    },
    setAllSkills: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSkills, addSkills, setAllSkills } = skillsSlice.actions;
export default skillsSlice.reducer;
