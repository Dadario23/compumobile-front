import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brand: "",
  model: "",
  failure: "",
  date: null,
  time: null,
};

export const deviceAndAppointmentSlice = createSlice({
  name: "deviceAndAppointment",
  initialState,
  reducers: {
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setModel: (state, action) => {
      state.model = action.payload;
    },
    setFailure: (state, action) => {
      state.failure = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
  },
});

export const { setBrand, setModel, setFailure, setDate, setTime } =
  deviceAndAppointmentSlice.actions;

export default deviceAndAppointmentSlice.reducer;
