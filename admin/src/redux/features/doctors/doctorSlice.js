import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const getInitialToken = () => {
  try {
    const token = localStorage.getItem("dtoken") || "";
    console.log("doctorSlice: Initial dtoken from localStorage:", token);
    return token;
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return "";
  }
};
const initialState = {
  backendUrl: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
  dtoken: getInitialToken(),
  doctorData: null,
  appointments: [],
  profileData: null, // Added to store profile data
  loading: false,
  error: null,
};
// Add this with other createAsyncThunk actions

export const getProfileData = createAsyncThunk(
  "doctor/getProfileData",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { backendUrl, dtoken } = getState().doctor;

    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${backendUrl}/api/doctors/profile`, {
        headers: { Authorization: `Bearer ${dtoken}` },
      });

      const { data } = response;
      if (data.success) {
        dispatch(setProfileData(data.data || data)); // Store profile data
        console.log(data);
        dispatch(setLoading(false));
        return data;
      } else {
        dispatch(setError(data.message || "Failed to fetch profile data"));
        toast.error(data.message || "Failed to fetch profile data");
        dispatch(setLoading(false));
        return rejectWithValue(data.message || "Failed to fetch profile data");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch profile data";
      dispatch(setError(errorMsg));
      toast.error(errorMsg);
      dispatch(setLoading(false));
      return rejectWithValue(errorMsg);
    }
  }
);
// The rest of the slice remains unchanged
export const loginDoctor = createAsyncThunk(
  "doctor/loginDoctor",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    const backendUrl =
      import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${backendUrl}/api/doctors/login`, {
        email,
        password,
      });

      const { data } = response;
      if (data?.success) {
        dispatch(setDoctorToken(data.token));
        if (data.doctor) {
          const doctorWithId = {
            ...data.doctor,
            _id: data.doctor._id || data.doctor.id,
          };
          dispatch(setDoctorData(doctorWithId));
        } else {
          console.warn("loginDoctor: No doctor data in response");
        }
        dispatch(setLoading(false));
        return data;
      } else {
        dispatch(setError(data?.message || "Invalid credentials"));
        toast.error(data?.message || "Invalid credentials");
        dispatch(setLoading(false));
        return rejectWithValue(data?.message || "Invalid credentials");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";
      dispatch(setError(errorMsg));
      toast.error(errorMsg);
      dispatch(setLoading(false));
      return rejectWithValue(errorMsg);
    }
  }
);
export const getDashData = createAsyncThunk(
  "doctor/getDashData",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { backendUrl, dtoken } = getState().doctor;

    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${backendUrl}/api/doctors/dashboard`, {
        headers: { Authorization: `Bearer ${dtoken}` },
      });

      const { data } = response;
      if (data.success) {
        dispatch(setLoading(false));
        console.log(data);
        return data;
      } else {
        dispatch(setError(data.message || "Failed to fetch dashboard data"));
        toast.error(data.message || "Failed to fetch dashboard data");
        dispatch(setLoading(false));
        return rejectWithValue(
          data.message || "Failed to fetch dashboard data"
        );
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch dashboard data";
      dispatch(setError(errorMsg));
      toast.error(errorMsg);
      dispatch(setLoading(false));
      return rejectWithValue(errorMsg);
    }
  }
);
export const fetchDoctorAppointments = createAsyncThunk(
  "doctor/fetchDoctorAppointments",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { backendUrl, dtoken } = getState().doctor;
    console.log("fetchDoctorAppointments: dtoken:", dtoken);

    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${backendUrl}/api/doctors/all-appointments`,
        {
          headers: { Authorization: `Bearer ${dtoken}` },
        }
      );

      const { data } = response;
      console.log("fetchDoctorAppointments: API response:", data);

      const appointments = Array.isArray(data.data)
        ? data.data
        : data.data || [];
      if (data.success || Array.isArray(appointments)) {
        dispatch(setAppointments(appointments));
        if (data.doctor) {
          const doctorWithId = {
            ...data.doctor,
            _id: data.doctor._id || data.doctor.id,
          };
          dispatch(setDoctorData(doctorWithId));
        } else {
          console.warn("fetchDoctorAppointments: No doctor data in response");
        }
        dispatch(setLoading(false));
        return appointments;
      } else {
        dispatch(setError(data.message || "Failed to fetch appointments"));
        toast.error(data.message || "Failed to fetch appointments");
        dispatch(setLoading(false));
        return rejectWithValue(data.message || "Failed to fetch appointments");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("Error in fetchDoctorAppointments:", errorMessage);
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
      dispatch(setLoading(false));
      return rejectWithValue(errorMessage);
    }
  }
);

export const cancelAppointment = createAsyncThunk(
  "doctor/cancelAppointment",
  async (appointmentId, { getState, dispatch, rejectWithValue }) => {
    const { backendUrl, dtoken, doctorData, appointments } = getState().doctor;
    if (!doctorData?._id) {
      const errorMsg = "Doctor data not available. Please log in again.";
      dispatch(setError(errorMsg));
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
    try {
      // Optimistic update
      dispatch(
        setAppointments(
          appointments.map((appt) =>
            appt._id === appointmentId ? { ...appt, cancelled: true } : appt
          )
        )
      );
      const response = await axios.post(
        `${backendUrl}/api/doctors/appointment-cancel`,
        { docId: doctorData._id, appointmentId },
        { headers: { Authorization: `Bearer ${dtoken}` } }
      );

      const { data } = response;
      if (data.success) {
        toast.success(data.message || "Appointment cancelled successfully");
        dispatch(
          setAppointments(
            appointments.map((appt) =>
              appt._id === appointmentId ? { ...appt, cancelled: true } : appt
            )
          )
        );
        return { appointmentId, cancelled: true };
      } else {
        // Revert optimistic update
        dispatch(
          setAppointments(
            appointments.map((appt) =>
              appt._id === appointmentId ? { ...appt, cancelled: false } : appt
            )
          )
        );
        toast.error(data.message || "Failed to cancel appointment");
        return rejectWithValue(data.message || "Failed to cancel appointment");
      }
    } catch (error) {
      // Revert optimistic update
      dispatch(
        setAppointments(
          appointments.map((appt) =>
            appt._id === appointmentId ? { ...appt, cancelled: false } : appt
          )
        )
      );
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to cancel appointment";
      dispatch(setError(errorMsg));
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

export const completeAppointment = createAsyncThunk(
  "doctor/completeAppointment",
  async (appointmentId, { getState, dispatch, rejectWithValue }) => {
    const { backendUrl, dtoken, doctorData, appointments } = getState().doctor;
    if (!doctorData?._id) {
      const errorMsg = "Doctor data not available. Please log in again.";
      dispatch(setError(errorMsg));
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
    try {
      // Optimistic update
      dispatch(
        setAppointments(
          appointments.map((appt) =>
            appt._id === appointmentId ? { ...appt, isCompleted: true } : appt
          )
        )
      );
      const response = await axios.post(
        `${backendUrl}/api/doctors/appointment-complete`,
        { docId: doctorData._id, appointmentId },
        { headers: { Authorization: `Bearer ${dtoken}` } }
      );

      const { data } = response;
      if (data.success) {
        toast.success(data.message || "Appointment completed successfully");
        dispatch(
          setAppointments(
            appointments.map((appt) =>
              appt._id === appointmentId ? { ...appt, isCompleted: true } : appt
            )
          )
        );
        return { appointmentId, isCompleted: true };
      } else {
        // Revert optimistic update
        dispatch(
          setAppointments(
            appointments.map((appt) =>
              appt._id === appointmentId
                ? { ...appt, isCompleted: false }
                : appt
            )
          )
        );
        toast.error(data.message || "Failed to complete appointment");
        return rejectWithValue(
          data.message || "Failed to complete appointment"
        );
      }
    } catch (error) {
      // Revert optimistic update
      dispatch(
        setAppointments(
          appointments.map((appt) =>
            appt._id === appointmentId ? { ...appt, isCompleted: false } : appt
          )
        )
      );
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to complete appointment";
      dispatch(setError(errorMsg));
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctorToken: (state, action) => {
      state.dtoken = action.payload;
      try {
        if (action.payload) {
          localStorage.setItem("dtoken", action.payload);
        } else {
          localStorage.removeItem("dtoken");
          toast.success("Doctor token removed successfully");
        }
      } catch (error) {
        console.error("Error accessing localStorage:", error);
        state.error = "Failed to access localStorage";
        toast.error("Failed to access localStorage");
      }
    },
    setDoctorData: (state, action) => {
      state.doctorData = action.payload;
      state.error = null;
    },
    setAppointments: (state, action) => {
      state.appointments = action.payload;
      state.error = null;
    },
    setProfileData: (state, action) => {
      // New reducer for profile data
      state.profileData = action.payload;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.dtoken = "";
      state.doctorData = null;
      state.appointments = [];
      state.profileData = null; // Clear profile data on logout
      state.error = null;
      try {
        localStorage.removeItem("dtoken");
        console.log("doctorSlice: Removed dtoken from localStorage");
      } catch (error) {
        console.error("Error accessing localStorage:", error);
        state.error = "Failed to clear localStorage";
        toast.error("Failed to clear localStorage");
      }
    },
  },
});

export const {
  setDoctorToken,
  setDoctorData,
  setAppointments,
  setProfileData, // Export new reducer
  setLoading,
  setError,
  logout,
} = doctorSlice.actions;

export default doctorSlice.reducer;
