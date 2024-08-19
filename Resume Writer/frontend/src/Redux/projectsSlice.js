import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { ProjectTitle: "", Year: "", Role: "", Location: "", Description: "" },
];

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      const { index, field, value } = action.payload;
      state[index][field] = value;
    },
    addProjects: (state) => {
      state.push({
        ProjectTitle: "",
        Year: "",
        Role: "",
        Location: "",
        Description: "",
      });
    },
    setAllProjects: (state, action) => {
      return action.payload;
    },
  },
});

export const { setProjects, addProjects, setAllProjects } =
  projectSlice.actions;
export default projectSlice.reducer;
