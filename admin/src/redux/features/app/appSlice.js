import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currencySymbol: "$", // Currency symbol for UI display
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

// Utility function to calculate age
export const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  return age;
};

// Export reducer
export default appSlice.reducer;
