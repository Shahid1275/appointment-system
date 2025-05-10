import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginDoctor } from "../redux/features/doctors/doctorSlice";
import { setAToken } from "../redux/features/admin/adminSlice";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { atoken } = useSelector((state) => state.admin);
  const { dtoken, loading } = useSelector((state) => state.doctor);
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    const checkAuth = () => {
      console.log("Login useEffect: atoken:", atoken, "dtoken:", dtoken);
      if (atoken) {
        navigate("/admin-dashboard", { replace: true });
      } else if (dtoken) {
        navigate("/doctor-dashboard", { replace: true });
      }
    };

    // Small delay to ensure Redux state is updated
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [atoken, dtoken, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      if (state === "Admin") {
        const response = await fetch(`${API_BASE_URL}/admin/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        if (data?.success) {
          localStorage.setItem("atoken", data.token);
          dispatch(setAToken(data.token));
          toast.success("Welcome Admin!");
          navigate("/admin-dashboard", { replace: true });
        } else {
          toast.error(data?.message || "Invalid credentials");
        }
      } else {
        // Use Redux thunk for doctor login
        const result = await dispatch(
          loginDoctor({ email, password })
        ).unwrap();
        if (result.success) {
          toast.success("Welcome Doctor!");
          navigate("/doctor-dashboard", { replace: true });
        }
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";
      toast.error(errorMsg);
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
