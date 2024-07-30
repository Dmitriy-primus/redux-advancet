import { createSlice } from "@reduxjs/toolkit";

const initialState = { visibilityCart: false, statusMessage: null };

const cartButtonSlice = createSlice({
  name: "visibility",
  initialState: initialState,
  reducers: {
    cartVisibility(state) {
      state.visibilityCart = !state.visibilityCart;
    },
    statusBarMessage(state, action) {
      state.statusMessage = {
        status: action.payload.status,
        message: action.payload.message,
        title: action.payload.title,
      };
    },
  },
});

export const cartButtonAction = cartButtonSlice.actions;

export default cartButtonSlice;
