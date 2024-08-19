import { configureStore } from "@reduxjs/toolkit";
import personalInfoReducer from "./personalInfoSlice";
import educationReducer from "./educationSlice";
import workReducer from "./workSlice";
import projectsReducer from "./projectsSlice";
import skillsReducer from "./skillsSlice";
import extraReducer from "./extraSlice";
export const store = configureStore({
  reducer: {
    personalInfo: personalInfoReducer,
    education: educationReducer,
    work: workReducer,
    projects: projectsReducer,
    skills: skillsReducer,
    extra: extraReducer,
  },
});
