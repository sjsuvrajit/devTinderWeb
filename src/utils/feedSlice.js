import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      const newArray = state.filter((user) => user._id !== action.payload);
      return newArray;
    },
    emptyFeed: (state, action) => {
      return null;
    },
  },
});

export const { addFeed, removeUserFromFeed, emptyFeed } = feedSlice.actions;

export default feedSlice.reducer;
