import { createSlice } from "@reduxjs/toolkit";

const getInitialToken = () => {
  try {
    const token = localStorage.getItem("dtoken") || null;
    console.log("doctorSlice: Initial dtoken from localStorage:", token);
    return token;
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return null;
  }
};

const initialState = {
  currencySymbol: "$",
  token: getInitialToken(),
  doctorData: null,
  loading: false,
  error: null,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctorToken: (state, action) => {
      state.token = action.payload;
      state.error = null;
    },
    setDoctorData: (state, action) => {
      state.doctorData = action.payload;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearDoctorData: (state) => {
      state.token = null;
      state.doctorData = null;
      state.error = null;
      try {
        localStorage.removeItem("dtoken");
        console.log("doctorSlice: Removed dtoken from localStorage");
      } catch (error) {
        console.error("Error accessing localStorage:", error);
        state.error = "Failed to clear localStorage";
      }
    },
  },
});

export const {
  setDoctorToken,
  setDoctorData,
  setLoading,
  setError,
  clearDoctorData,
} = doctorSlice.actions;

export default doctorSlice.reducer;
