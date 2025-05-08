// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Route, Routes } from "react-router-dom";
// import {
//   fetchUserProfile,
//   fetchDoctors,
// } from "./redux/features/doctors/doctorSlice";
// import Home from "./pages/Home";
// import Doctors from "./pages/Doctors";
// import Login from "./pages/Login";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import MyAppointments from "./pages/MyAppointments";
// import Appointment from "./pages/Appointment";
// import MyProfile from "./pages/MyProfile";
// import SuccessPage from "./pages/SuccessPage"; // Renamed for clarity
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import { ToastContainer } from "react-toastify";

// const App = () => {
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.doctor);

//   useEffect(() => {
//     dispatch(fetchDoctors());
//     if (token) {
//       dispatch(fetchUserProfile());
//     }
//   }, [token, dispatch]);

//   return (
//     <div className="mx-4 sm:mx-[10%]">
//       <ToastContainer />
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/doctors" element={<Doctors />} />
//         <Route path="/doctors/:speciality" element={<Doctors />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/myappointments" element={<MyAppointments />} />
//         <Route path="/appointment/:docId" element={<Appointment />} />
//         <Route path="/my-profile" element={<MyProfile />} />
//         <Route path="/payment-success" element={<SuccessPage />} />
//       </Routes>
//       <Footer />
//     </div>
//   );
// };

// export default App;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import {
  fetchUserProfile,
  fetchDoctors,
} from "./redux/features/doctors/doctorSlice";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import MyProfile from "./pages/MyProfile";
import PaymentSuccess from "./pages/PaymentSuccess";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.doctor);

  useEffect(() => {
    console.log("App.jsx - Fetching doctors on mount");
    dispatch(fetchDoctors());

    if (token) {
      console.log("App.jsx - Fetching user profile due to token:", token);
      dispatch(fetchUserProfile());
    }
  }, [token, dispatch]);

  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/myappointments" element={<MyAppointments />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/success" element={<PaymentSuccess />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
