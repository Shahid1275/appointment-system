import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../features/app/appSlice";
import adminReducer from "../features/admin/adminSlice";
import doctorReducer from "../features/doctors/doctorSlice";

export const store = configureStore({
  reducer: {
    app: appReducer, // Replaces doctor: doctorReducer
    admin: adminReducer, // New admin reducer
    doctor: doctorReducer,
  },
});
