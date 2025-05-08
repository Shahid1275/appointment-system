import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setAToken } from "../redux/features/admin/adminSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendUrl } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
          ? `${backendUrl}/admin/login`
          : `${backendUrl}/doctor/login`;

      const { data } = await axios.post(endpoint, { email, password });

      if (data?.success) {
        localStorage.setItem("atoken", data.token);
        dispatch(setAToken(data.token));
        toast.success(`Welcome ${state}!`);
        navigate("/admin-dashboard");
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
          <p className="text-sm font-medium text-gray-700">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Password</p>
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

        {state === "Admin" ? (
          <p className="text-center text-sm text-gray-600">
            Doctor Login?{" "}
            <span
              onClick={() => setState("Doctor")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              click here
            </span>
          </p>
        ) : (
          <p className="text-center text-sm text-gray-600">
            Admin Login?{" "}
            <span
              onClick={() => setState("Admin")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
