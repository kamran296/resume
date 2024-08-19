import { createSlice } from "@reduxjs/toolkit";

const initialState = [{ Company: "", Title: "", Date: "", Description: "" }];

const workSlice = createSlice({
  name: "work",
  initialState,
  reducers: {
    setWorkExperience: (state, action) => {
      const { index, field, value } = action.payload;
      state[index][field] = value;
    },
    addWork: (state) => {
      state.push({ Company: "", Title: "", Date: "", Description: "" });
    },
    setAllWork: (state, action) => {
      return action.payload;
    },
  },
});

export const { setWorkExperience, addWork, setAllWork } = workSlice.actions;
export default workSlice.reducer;
