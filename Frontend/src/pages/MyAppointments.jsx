import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CheckCircleIcon,
  XCircleIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

const AppointmentsPage = () => {
  const { backendUrl, token } = useSelector((state) => state.doctor);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const shownToasts = useRef(new Set()); // Track shown toasts to prevent duplicates

  // Date formatting utilities
  const formatDate = (dateString) => {
    if (!dateString) {
      console.warn("Missing dateString, returning N/A");
      return "N/A";
    }
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.warn(`Invalid dateString: ${dateString}`);
        return "N/A";
      }
      const options = { day: "numeric", month: "short", year: "numeric" };
      return date.toLocaleDateString("en-US", options);
    } catch (error) {
      console.error("Date formatting error:", error, "Date:", dateString);
      return "N/A";
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    try {
      const [hours, minutes] = timeString.split(":");
      const hour = parseInt(hours, 10);
      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${period}`;
    } catch (error) {
      console.error("Time formatting error:", error);
      return "N/A";
    }
  };

  // Fetch all appointments from backend
  const fetchAppointments = async (appointmentId = null) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${backendUrl}/api/user/get-appointments`,
        { headers: { token } }
      );
      if (data.success) {
        const updatedAppointments = data.appointments.reverse();
        setAppointments(updatedAppointments);
        console.log(
          "Fetched appointments:",
          updatedAppointments.map((appt) => ({
            id: appt._id,
            payment: appt.payment,
            paymentDate: appt.paymentDate,
          }))
        );
        if (appointmentId && !shownToasts.current.has(appointmentId)) {
          const updatedAppointment = updatedAppointments.find(
            (appt) => appt._id === appointmentId
          );
          if (updatedAppointment?.payment) {
            toast.success(`Appointment ${appointmentId} is now paid`);
            shownToasts.current.add(appointmentId); // Mark toast as shown
          }
        }
      } else {
        toast.error(data.message || "Failed to fetch appointments");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch appointments"
      );
      console.error("Appointment fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cancel appointment
  const handleCancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Appointment cancelled successfully");
        setAppointments((prev) =>
          prev.map((appt) =>
            appt._id === appointmentId
              ? { ...appt, status: "cancelled", cancelled: true }
              : appt
          )
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to cancel appointment"
      );
    }
  };

  // Initiate payment
  const handlePayment = async (appointmentId) => {
    try {
      setProcessingPayment(appointmentId);
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-stripe`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || "Failed to initiate payment");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          error.message ||
          "Payment initiation failed"
      );
    } finally {
      setProcessingPayment(null);
    }
  };

  // Fetch appointments on mount and handle refresh
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const shouldRefresh = params.get("refresh") === "true";
    const appointmentId = params.get("appointment_id");

    if (shouldRefresh || !appointments.length) {
      fetchAppointments(appointmentId);
      if (shouldRefresh) {
        navigate("/myappointments", { replace: true });
      }
    }
  }, [location.search, token, backendUrl]); // Removed appointments.length from dependencies

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Empty state
  if (appointments.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">
          No appointments
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          You haven't booked any appointments yet.
        </p>
        <div className="mt-6">
          <button
            onClick={() => navigate("/doctors")}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Book an Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            My Appointments
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your upcoming appointments
          </p>
        </div>

        <ul className="divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <li key={appointment._id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
                      <img
                        className="h-full w-full object-cover"
                        src={
                          appointment.docData?.image ||
                          "https://via.placeholder.com/128"
                        }
                        alt={appointment.docData?.name || "Doctor"}
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">
                        Dr. {appointment.docData?.name || "Unknown Doctor"}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {appointment.docData?.specialty ||
                          "General Practitioner"}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-medium">Date:</span>{" "}
                        {formatDate(appointment.slotDate)}
                        <span className="mx-2">•</span>
                        <span className="font-medium">Time:</span>{" "}
                        {formatTime(appointment.slotTime)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    {appointment.cancelled ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        <XCircleIcon className="h-4 w-4 mr-1" />
                        Cancelled
                      </span>
                    ) : appointment.payment ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                        Paid
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => handlePayment(appointment._id)}
                          disabled={processingPayment === appointment._id}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {processingPayment === appointment._id ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            <>
                              <CreditCardIcon className="h-4 w-4 mr-1" />
                              Pay online
                            </>
                          )}
                        </button>
                        <button
                          onClick={() =>
                            handleCancelAppointment(appointment._id)
                          }
                          className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Cancel appointment
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Location:</span>{" "}
                        {appointment.docData?.address?.address1 ||
                          "Not specified"}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-medium">Fee:</span> $
                        {appointment.amount?.toFixed(2) || "0.00"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Booked on:</span>{" "}
                        {formatDate(appointment.date)}
                      </p>
                      {appointment.payment && (
                        <p className="text-sm text-gray-500 mt-1">
                          <span className="font-medium">Paid on:</span>{" "}
                          {formatDate(appointment.paymentDate)}
                        </p>
                      )}
                      {appointment.payment && appointment.paymentId && (
                        <p className="text-sm text-gray-500 mt-1">
                          <span className="font-medium">Transaction ID:</span>{" "}
                          {appointment.paymentId.substring(0, 8)}...
                        </p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-medium">Booking ID:</span>{" "}
                        {appointment._id}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AppointmentsPage;
