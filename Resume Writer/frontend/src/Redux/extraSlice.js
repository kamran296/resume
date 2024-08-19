import { createSlice } from "@reduxjs/toolkit";

const initialState = [{ Title: "", Description: "" }];

const extraSlice = createSlice({
  name: "extra",
  initialState,
  reducers: {
    setExtra: (state, action) => {
      const { index, field, value } = action.payload;
      state[index][field] = value;
    },
    addExtra: (state) => {
      state.push({ Title: "", Description: "" });
    },
    setAllExtra: (state, action) => {
      return action.payload;
    },
  },
});

export const { setExtra, addExtra, setAllExtra } = extraSlice.actions;
export default extraSlice.reducer;
