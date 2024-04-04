import { createSlice } from "@reduxjs/toolkit";

interface authState {
  isAuth: boolean;
  user: object | null;
  otp: {
    phone: string;
    hash: string;
  };
}

const initialState: authState = {
  isAuth: false,
  user: {
    activated: false,
  },
  otp: {
    phone: "",
    hash: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      if (user == null) {
        state.isAuth = false;
      } else {
        state.isAuth = true;
      }
    },
    setOtp: (state, action) => {
      const { phone, hash } = action.payload;
      state.otp.phone = phone;
      state.otp.hash = hash;
    },
  },
});

export const { setAuth, setOtp } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default authSlice.reducer;
