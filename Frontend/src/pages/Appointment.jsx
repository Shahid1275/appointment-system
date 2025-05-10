import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import {
  fetchDoctors,
  bookAppointment,
} from "../redux/features/doctors/doctorSlice";
import LoadingSpinner from "./LoadingSpinner";

const Appointments = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { doctors, currencySymbol, token, userData, status } = useSelector(
    (state) => state.doctor
  );

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDoctorSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);

  // Validate token on component mount
  useEffect(() => {
    if (!token) {
      toast.error("Please login to access appointment booking");
      navigate("/login");
    }
  }, [token, navigate]);

  const fetchDocInfo = async () => {
    try {
      setIsLoading(true);
      if (doctors.length === 0) {
        await dispatch(fetchDoctors()).unwrap();
      }
      const docInfo = doctors.find((doc) => doc._id === docId);
      setDocInfo(docInfo);
    } catch (error) {
      toast.error("Failed to load doctor information");
      console.error("Fetch doctor error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAvailableSlots = async () => {
    setDoctorSlots([]);
    let today = new Date();
    const updatedDocInfo = doctors.find((doc) => doc._id === docId);
    const slotsBooked = updatedDocInfo?.slots_booked || {};

    let allSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let startTime = new Date(currentDate);
      startTime.setHours(10, 0, 0, 0);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      let timeSlots = [];
      let slotTime = new Date(startTime);

      while (slotTime < endTime) {
        let formattedTime = slotTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        let isAvailable = true;
        if (i === 0) {
          const now = new Date();
          isAvailable = slotTime.getTime() > now.getTime() + 30 * 60 * 1000;
        }

        // Skip adding slot if already booked
        const slotDate = currentDate.toISOString().split("T")[0];
        if (slotsBooked[slotDate]?.includes(formattedTime)) {
          slotTime.setMinutes(slotTime.getMinutes() + 30);
          continue;
        }

        if (isAvailable) {
          timeSlots.push({
            datetime: new Date(slotTime),
            time: formattedTime,
          });
        }

        slotTime.setMinutes(slotTime.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }

    // Find the first day with available slots
    const firstAvailableDay = allSlots.findIndex((day) => day.length > 0);
    setSlotIndex(firstAvailableDay >= 0 ? firstAvailableDay : 0);
    setDoctorSlots(allSlots);
  };

  const bookappointment = async () => {
    if (isBooking) return;
    setIsBooking(true);

    if (!token) {
      toast.warn("Please login first");
      setIsBooking(false);
      return navigate("/login");
    }

    if (!userData?.phone || !userData?.address) {
      toast.warn("Please complete your profile before booking");
      setIsBooking(false);
      return navigate("/my-profile");
    }

    if (!slotTime || !docInfo || docSlots.length === 0) {
      toast.error("Please select a valid time slot");
      setIsBooking(false);
      return;
    }

    try {
      // Immediately update UI by removing the booked slot
      setDoctorSlots((prev) =>
        prev.map((daySlots, idx) =>
          idx === slotIndex
            ? daySlots.filter((slot) => slot.time !== slotTime)
            : daySlots
        )
      );

      const slotDate = new Date();
      slotDate.setDate(new Date().getDate() + slotIndex);

      const appointmentData = {
        userId: userData._id,
        docId: docInfo._id,
        slotDate: slotDate.toISOString().split("T")[0],
        slotTime: slotTime,
      };

      await dispatch(bookAppointment(appointmentData)).unwrap();
      toast.success("Appointment booked!");
      setSlotTime("");
      navigate("/myappointments");
    } catch (error) {
      toast.error(error.message || "Failed to book appointment");
    } finally {
      setIsBooking(false);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [docId]);
  const handleDayChange = (index) => {
    setSlotIndex(index);
    setSlotTime("");
  };

  if (isLoading || !docInfo) {
    return <LoadingSpinner />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      {/* Doctor Details */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-shrink-0">
          <img
            className="w-full sm:w-72 h-72 object-cover rounded-lg bg-blue-100"
            src={docInfo.image || assets.default_doctor}
            alt={docInfo.name}
            onError={(e) => (e.target.src = assets.default_doctor)}
          />
        </div>

        <div className="flex-1 border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-gray-900">
              {docInfo.name}
            </h2>
            <img
              className="w-5 h-5"
              src={assets.verified_icon}
              alt="Verified"
            />
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <span className="py-1 px-3 border border-gray-300 text-xs rounded-full bg-blue-50 text-blue-700">
              {docInfo.experience} years
            </span>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
              <span>About</span>
              <img className="w-3 h-3" src={assets.info_icon} alt="Info" />
            </div>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1 leading-relaxed">
              {docInfo.about}
            </p>
          </div>
          <p className="mt-4 text-sm font-medium text-gray-900">
            Appointment Fee:{" "}
            <span className="text-gray-700">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="mt-8 sm:ml-72 sm:pl-4">
        <h3 className="text-lg font-semibold text-gray-700">Booking Slots</h3>

        {/* Day Selector */}
        <div className="flex gap-3 items-center w-full overflow-x-auto mt-4 pb-2 scrollbar-hide">
          {docSlots.length > 0 &&
            docSlots.map((item, index) => {
              if (item.length === 0) return null;

              const dayIndex = item[0].datetime.getDay();
              const dateNum = item[0].datetime.getDate();
              const monthNum = item[0].datetime.getMonth() + 1;

              return (
                <div
                  onClick={() => handleDayChange(index)}
                  className={`text-center py-4 px-4 min-w-[80px] rounded-lg cursor-pointer transition-all duration-200 ${
                    slotIndex === index
                      ? "bg-blue-600 text-white shadow-md"
                      : "border border-gray-200 bg-white hover:bg-gray-50 shadow-sm"
                  }`}
                  key={index}
                >
                  <p className="text-sm font-medium">{daysOfWeek[dayIndex]}</p>
                  <p className="text-lg font-semibold">
                    {dateNum}/{monthNum}
                  </p>
                </div>
              );
            })}
        </div>

        {/* Time Slots */}
        <div className="flex flex-row-reverse gap-3 items-center w-full overflow-x-auto snap-x snap-mandatory mt-4 pb-4 scrollbar-hide">
          {docSlots.length > 0 && docSlots[slotIndex]?.length > 0 ? (
            docSlots[slotIndex].map((item, index) => (
              <button
                onClick={() => setSlotTime(item.time)}
                className={`text-center text-xs sm:text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 min-w-[5rem] snap-center ${
                  item.time === slotTime
                    ? "bg-blue-600 text-white shadow-md"
                    : "border border-gray-300 text-gray-600 hover:bg-gray-100 cursor-pointer"
                }`}
                key={index}
              >
                {new Date(item.datetime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </button>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No slots available for this day
            </p>
          )}
        </div>

        {/* Book Button */}
        <div className="mt-6">
          <button
            onClick={bookappointment}
            className={`w-full sm:w-auto cursor-pointer px-8 py-3 rounded-full font-medium text-base transition-all duration-300 shadow-md ${
              slotTime && status !== "loading" && !isBooking
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!slotTime || status === "loading" || isBooking}
          >
            {status === "loading" || isBooking ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
              </span>
            ) : slotTime ? (
              `Book Appointment for ${currencySymbol}${docInfo.fees}`
            ) : (
              "Select a time slot"
            )}
          </button>
        </div>
      </div>

      {/* Related Doctors */}
      <div className="mt-12 max-w-7xl mx-auto">
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>

      {/* Custom CSS for Scrollbar Hiding */}
      <style>
        {`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}
      </style>
    </div>
  );
};

export default Appointments;
