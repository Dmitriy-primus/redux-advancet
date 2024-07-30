import { configureStore } from "@reduxjs/toolkit";
import cartButtonSlice from "./cartButton-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    visibility: cartButtonSlice.reducer,
    cartManage: cartSlice.reducer,
  },
});

export default store;
