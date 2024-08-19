import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Name: "",
  Address: "",
  Phone: "",
  Email: "",
};

const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState,
  reducers: {
    setPersonalInfo: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    updatePersonalInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setPersonalInfo, updatePersonalInfo } =
  personalInfoSlice.actions;
export default personalInfoSlice.reducer;
