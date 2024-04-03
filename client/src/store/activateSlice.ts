import { createSlice } from "@reduxjs/toolkit";

interface activateInitialType {
  name: string;
  avatar: string;
}

const initialState: activateInitialType = {
  name: "",
  avatar: "",
};

export const activateSlice = createSlice({
  name: "activate",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
  },
});

export const { setName, setAvatar } = activateSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default activateSlice.reducer;
