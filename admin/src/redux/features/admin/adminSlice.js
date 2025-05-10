import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Get token from localStorage if exists
const getInitialToken = () => {
  try {
    return localStorage.getItem("atoken") || "";
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return "";
  }
};

const initialState = {
  adminMode: false,
  atoken: getInitialToken(),
  backendUrl: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
  doctors: [],
  appointments: [],
  loading: false,
  error: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminMode: (state, action) => {
      state.adminMode = action.payload;
    },
    setAToken: (state, action) => {
      state.atoken = action.payload;
      try {
        if (action.payload) {
          localStorage.setItem("atoken", action.payload);
        } else {
          localStorage.removeItem("atoken");
        }
      } catch (error) {
        console.error("Error accessing localStorage:", error);
      }
    },
    logout: (state) => {
      state.atoken = "";
      state.adminMode = false;
      state.doctors = [];
      state.appointments = [];
      try {
        localStorage.removeItem("atoken");
      } catch (error) {
        console.error("Error accessing localStorage:", error);
      }
    },
    setDoctors: (state, action) => {
      state.doctors = action.payload;
      state.loading = false;
      state.error = null;
    },
    setAppointments: (state, action) => {
      state.appointments = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateDoctorAvailability: (state, action) => {
      const { docId } = action.payload;
      state.doctors = state.doctors.map((doctor) =>
        doctor._id === docId
          ? { ...doctor, available: !doctor.available }
          : doctor
      );
    },
  },
});

// Async action to change availability
export const changeAvailability = (docId) => async (dispatch, getState) => {
  const { backendUrl, atoken } = getState().admin;

  try {
    const { data } = await axios.post(
      `${backendUrl}/admin/change-availability`,
      { docId },
      { headers: { atoken } }
    );

    if (data.message === "Availability changed successfully") {
      toast.success("Availability changed successfully");
      dispatch(updateDoctorAvailability({ docId }));
    } else {
      toast.error(data.message || "Error changing availability");
    }
    return data;
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Error changing availability");
    throw error;
  }
};

// Async action to fetch all doctors
export const fetchAllDoctors = () => async (dispatch, getState) => {
  const { backendUrl, atoken } = getState().admin;

  try {
    dispatch(setLoading(true));
    const { data } = await axios.post(
      `${backendUrl}/admin/all-doctors`,
      {},
      { headers: { atoken } }
    );

    if (data.success) {
      dispatch(setDoctors(data.data || []));
    } else {
      dispatch(setError(data.message || "Failed to fetch doctors"));
      toast.error(data.message || "Failed to fetch doctors");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error("Error in fetchAllDoctors:", errorMessage);
    dispatch(setError(errorMessage));
    toast.error(errorMessage);
  }
};

// Async action to fetch all appointments
export const getallAppointments = createAsyncThunk(
  "admin/getallAppointments",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { backendUrl, atoken } = getState().admin;

    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${backendUrl}/admin/appointments`, {
        headers: { atoken },
      });

      const { data } = response;
      if (data.success) {
        console.log(data);
        dispatch(setAppointments(data.data || []));
        return data.data;
      } else {
        dispatch(setError(data.message || "Failed to fetch appointments"));
        toast.error(data.message || "Failed to fetch appointments");
        return rejectWithValue(data.message || "Failed to fetch appointments");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("Error in getallAppointments:", errorMessage);
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Async action to cancel an appointment
export const cancelAppointment = createAsyncThunk(
  "admin/cancelAppointment",
  async (appointmentId, { getState, dispatch, rejectWithValue }) => {
    const { backendUrl, atoken } = getState().admin;

    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${backendUrl}/admin/cancel-appointment`,
        { appointmentId },
        { headers: { atoken } }
      );

      const { data } = response;
      if (data.success) {
        dispatch(
          setAppointments(
            getState().admin.appointments.map((appt) =>
              appt._id === appointmentId ? data.appointment : appt
            )
          )
        );
        toast.success(data.message || "Appointment cancelled successfully");
        return data.appointment;
      } else {
        dispatch(setError(data.message || "Failed to cancel appointment"));
        toast.error(data.message || "Failed to cancel appointment");
        return rejectWithValue(data.message || "Failed to cancel appointment");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("Error in cancelAppointment:", errorMessage);
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const {
  setAdminMode,
  setAToken,
  logout,
  setDoctors,
  setAppointments,
  setLoading,
  setError,
  updateDoctorAvailability,
} = adminSlice.actions;

export default adminSlice.reducer;
