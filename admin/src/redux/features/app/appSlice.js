import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // List of doctors for the user-facing app
  currencySymbol: "$", // Currency symbol for UI display
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

// Export actions for use in components
// export const { setDoctors } = appSlice.actions;

// Export reducer
export default appSlice.reducer;
