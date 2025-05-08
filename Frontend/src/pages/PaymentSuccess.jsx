import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const PaymentSuccess = () => {
  const { backendUrl, token } = useSelector((state) => state.doctor);
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      const options = {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      return date.toLocaleDateString("en-US", options);
    } catch (error) {
      console.error("Date formatting error:", error);
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

  useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(location.search);
      const sessionId = params.get("session_id");
      const appointmentId = params.get("appointment_id");

      if (!sessionId) {
        toast.error("Invalid payment session");
        navigate(
          `/myappointments?refresh=true${
            appointmentId ? `&appointment_id=${appointmentId}` : ""
          }`
        );
        return;
      }

      try {
        setLoading(true);
        const { data } = await axios.post(
          `${backendUrl}/api/user/verify-payment`,
          { sessionId },
          { headers: { token } }
        );

        if (data.success && data.payment) {
          const verifiedAppointment = {
            ...data.appointment,
            paymentDate:
              data.appointment.paymentDate || new Date().toISOString(),
            docData: data.appointment.docData || {},
            amount: data.appointment.amount || 0,
            paymentId: data.appointment.paymentId || "N/A",
            _id: data.appointment._id || appointmentId || "N/A",
            payment: data.appointment.payment,
          };
          setAppointment(verifiedAppointment);
          console.log("Verified appointment:", verifiedAppointment);
          // toast.success("Payment verified successfully!");
        } else {
          toast.error(data.error || "Payment verification failed");
          navigate(
            `/myappointments?refresh=true${
              appointmentId ? `&appointment_id=${appointmentId}` : ""
            }`
          );
        }
      } catch (error) {
        toast.error(
          error.response?.data?.error ||
            error.message ||
            "Payment verification failed"
        );
        navigate(
          `/myappointments?refresh=true${
            appointmentId ? `&appointment_id=${appointmentId}` : ""
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [navigate, token, backendUrl, location.search]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h3 className="text-2xl font-semibold text-gray-900">
          Unable to Load Appointment
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Something went wrong. Please check your appointments.
        </p>
        <button
          onClick={() =>
            navigate(
              `/myappointments?refresh=true${
                appointment?._id ? `&appointment_id=${appointment._id}` : ""
              }`
            )
          }
          className="mt-6 inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-200"
        >
          View Appointments
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircleIcon className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Payment Successful!
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Your appointment has been confirmed and payment processed.
          </p>
        </div>

        <div className="px-6 py-6 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">
            Appointment Details
          </h3>

          <div className="mt-4 flex items-center">
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
              <h4 className="text-lg font-semibold text-gray-900">
                Dr. {appointment.docData?.name || "Unknown Doctor"}
              </h4>
              <p className="text-sm text-gray-600">
                {appointment.docData?.specialty || "General Practitioner"}
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {formatDateTime(appointment.slotDate)}
              </p>
              <p className="mt-1">
                <span className="font-medium">Time:</span>{" "}
                {formatTime(appointment.slotTime)}
              </p>
              <p className="mt-1">
                <span className="font-medium">Location:</span>{" "}
                {appointment.docData?.address?.address1 || "Not specified"}
              </p>
            </div>

            <div>
              <p>
                <span className="font-medium">Fee:</span> $
                {appointment.amount?.toFixed(2) || "0.00"}
              </p>
              <p className="mt-1">
                <span className="font-medium">Paid on:</span>{" "}
                {formatDateTime(appointment.paymentDate)}
              </p>
              <p className="mt-1">
                <span className="font-medium">Transaction ID:</span>{" "}
                {appointment.paymentId?.substring(0, 8) + "..." || "N/A"}
              </p>
              <p className="mt-1">
                <span className="font-medium">Booking ID:</span>{" "}
                {appointment._id}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 text-center">
          <button
            onClick={() =>
              navigate(
                `/myappointments?refresh=true&appointment_id=${appointment._id}`
              )
            }
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-200"
          >
            View All Appointments
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
