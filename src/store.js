import { configureStore } from "@reduxjs/toolkit";
import userDetail from "./slices/userDetail";

export const store = configureStore({
  reducer: {
    app: userDetail,
  },
});