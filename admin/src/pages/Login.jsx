import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAToken } from "../redux/features/admin/adminSlice";
import { setDoctorToken } from "../redux/features/doctors/doctorSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Set API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { atoken } = useSelector((state) => state.admin);
  const { token: dtoken } = useSelector((state) => state.doctor); // Use token instead of dtoken
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (atoken) {
      navigate("/admin-dashboard", { replace: true });
    } else if (dtoken) {
      navigate("/doctor-dashboard", { replace: true });
    }
  }, [atoken, dtoken, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("Please enter both email and password");
      setLoading(false);
      return;
    }

    try {
      const endpoint =
        state === "Admin"
          ? `${API_BASE_URL}/admin/login`
          : `${API_BASE_URL}/api/doctor/login`;

      const { data } = await axios.post(endpoint, { email, password });

      if (data?.success) {
        const tokenKey = state === "Admin" ? "atoken" : "dtoken"; // Use consistent key
        localStorage.setItem(tokenKey, data.token);

        // Dispatch correct action based on user type
        if (state === "Admin") {
          dispatch(setAToken(data.token));
          navigate("/admin-dashboard", { replace: true });
        } else {
          dispatch(setDoctorToken(data.token));
          navigate("/doctor-dashboard", { replace: true });
        }

        toast.success(`Welcome ${state}!`);
      } else {
        toast.error(data?.message || "Invalid credentials");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="w-full max-w-sm mx-auto mt-10 bg-white p-8 rounded-lg shadow-md"
    >
      <div className="space-y-6">
        <p className="text-2xl font-bold text-center text-gray-800">
          <span className="text-blue-600">{state}</span> Login
        </p>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-200 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-600">
          {state === "Admin" ? "Doctor Login?" : "Admin Login?"}{" "}
          <span
            onClick={() => setState(state === "Admin" ? "Doctor" : "Admin")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            click here
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
