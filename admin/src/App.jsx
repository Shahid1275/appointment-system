import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import Dashboard from "./pages/admin/Dashboard";
import AllAppointment from "./pages/admin/AllAppointment";
import Doctorlist from "./pages/admin/Doctorlist";
import AddDoctor from "./pages/admin/AddDoctor";

const App = () => {
  const { atoken } = useSelector((state) => state.admin);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if no token exists
    if (!atoken && window.location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }, [atoken, navigate]);

  return (
    <>
      <ToastContainer />
      {atoken ? (
        <>
          <Navbar />
          <div className="flex items-start">
            <SideBar />
            <Routes>
              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/all-appointments" element={<AllAppointment />} />
              <Route path="/doctors-list" element={<Doctorlist />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route
                path="*"
                element={<Navigate to="/admin-dashboard" replace />}
              />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </>
  );
};

export default App;
