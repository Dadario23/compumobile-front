import { configureStore } from "@reduxjs/toolkit";
import deviceAndAppointmentReducer from "@/src/slices/deviceAndAppointmentSlice";
import userReducer from "./user";
import allUsersReducer from "./allUsers";

const store = configureStore({
  reducer: {
    user: userReducer,
    allUsers: allUsersReducer,
    deviceAndAppointment: deviceAndAppointmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
