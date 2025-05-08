import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currencySymbol: "$",
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {},
});

export default doctorSlice.reducer;
