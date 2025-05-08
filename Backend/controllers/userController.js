import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import Stripe from "stripe";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorsModel.js";
import appointmentModel from "../models/appointmentModel.js";

// Validation constants
const MIN_PASSWORD_LENGTH = 8;
const TOKEN_EXPIRATION = "1d";
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "All fields (name, email, password) are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address",
      });
    }

    // Validate password strength
    if (password.length < MIN_PASSWORD_LENGTH) {
      return res.status(400).json({
        success: false,
        error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "Email already registered. Please use a different email.",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: TOKEN_EXPIRATION,
    });

    // Return success response (excluding sensitive data)
    const userResponse = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      error: "An unexpected error occurred during registration",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Both email and password are required",
      });
    }

    // Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User does not exist",
      });
    }

    // Check if account is temporarily locked
    if (
      user.loginAttempts >= MAX_LOGIN_ATTEMPTS &&
      user.lockUntil > Date.now()
    ) {
      return res.status(429).json({
        success: false,
        error: `Account temporarily locked. Try again in ${Math.ceil(
          (user.lockUntil - Date.now()) / (60 * 1000)
        )} minutes.`,
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Increment login attempts
      await userModel.findByIdAndUpdate(user._id, {
        $inc: { loginAttempts: 1 },
        $set: { lockUntil: Date.now() + LOCK_TIME },
      });

      const attemptsLeft = MAX_LOGIN_ATTEMPTS - (user.loginAttempts + 1);
      return res.status(401).json({
        success: false,
        error: `Invalid credentials. ${
          attemptsLeft > 0 ? `${attemptsLeft} attempts remaining` : ""
        }`,
      });
    }

    // Reset login attempts on successful login
    await userModel.findByIdAndUpdate(user._id, {
      loginAttempts: 0,
      lockUntil: null,
    });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: TOKEN_EXPIRATION,
    });

    // Return success response (excluding sensitive data)
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      error: "An unexpected error occurred during login",
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const userData = await userModel.findById(userId).select("-password");

    if (!userData) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: userData,
    });
  } catch (error) {
    console.error("Error getting user profile:", error);
    return res.status(500).json({
      success: false,
      error: "An unexpected error occurred while getting user profile",
    });
  }
};

// const updateProfile = async (req, res) => {
//   try {
//     const { name, phone, dob, address, gender } = req.body;
//     const userId = req.user.id;
//     const imageFile = req.file;

//     if (!name || !phone || !dob || !address || !gender) {
//       return res.status(400).json({
//         success: false,
//         error: "Please fill all the fields",
//       });
//     }

//     let parsedAddress;
//     try {
//       parsedAddress =
//         typeof address === "string" ? JSON.parse(address) : address;
//     } catch (parseError) {
//       return res.status(400).json({
//         success: false,
//         error: "Invalid address format",
//       });
//     }

//     const updateData = {
//       name,
//       phone,
//       dob,
//       address: parsedAddress,
//       gender,
//     };

//     if (imageFile) {
//       try {
//         const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
//           folder: "user-profiles",
//           resource_type: "image",
//         });
//         updateData.image = imageUpload.secure_url;
//       } catch (uploadError) {
//         console.error("Image upload error:", uploadError);
//         return res.status(500).json({
//           success: false,
//           error: "Failed to upload profile image",
//         });
//       }
//     }

//     const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, {
//       new: true,
//       select: "-password",
//     });

//     if (!updatedUser) {
//       return res.status(404).json({
//         success: false,
//         error: "User not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       user: updatedUser,
//     });
//   } catch (error) {
//     console.error("Error updating user profile:", error);
//     return res.status(500).json({
//       success: false,
//       error: "An unexpected error occurred while updating user profile",
//     });
//   }
// };
const updateProfile = async (req, res) => {
  try {
    const { name, phone, dob, address, gender } = req.body;
    const userId = req.user.id;
    const imageFile = req.file;

    // Parse address if provided
    let parsedAddress = {};
    if (address) {
      try {
        parsedAddress =
          typeof address === "string" ? JSON.parse(address) : address;
      } catch (parseError) {
        return res.status(400).json({
          success: false,
          error: "Invalid address format",
        });
      }
    }

    // Prepare update data with only provided fields
    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (dob) updateData.dob = dob;
    if (Object.keys(parsedAddress).length > 0)
      updateData.address = parsedAddress;
    if (gender) updateData.gender = gender;

    if (imageFile) {
      try {
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
          folder: "user-profiles",
          resource_type: "image",
        });
        updateData.image = imageUpload.secure_url;
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        return res.status(500).json({
          success: false,
          error: "Failed to upload profile image",
        });
      }
    }

    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, {
      new: true,
      select: "-password",
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return res.status(500).json({
      success: false,
      error: "An unexpected error occurred while updating user profile",
    });
  }
};
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    // Validate input
    if (!userId || !docId || !slotDate || !slotTime) {
      return res.status(400).json({
        success: false,
        error: "All fields (userId, docId, slotDate, slotTime) are required",
      });
    }

    // Check if doctor exists and is available
    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData) {
      return res.status(404).json({
        success: false,
        error: "Doctor not found",
      });
    }
    if (!docData.available) {
      return res.status(400).json({
        success: false,
        error: "Doctor is not available",
      });
    }

    // Normalize slotTime to 24-hour format (e.g., "13:30")
    let normalizedSlotTime = slotTime;
    if (slotTime.includes(" ")) {
      const [time, period] = slotTime.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (period.toUpperCase() === "PM" && hours !== 12) {
        hours += 12;
      } else if (period.toUpperCase() === "AM" && hours === 12) {
        hours = 0;
      }
      normalizedSlotTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    }

    // Check slot availability
    let slots_booked = docData.slots_booked || {};
    if (slots_booked[slotDate]?.includes(normalizedSlotTime)) {
      return res.status(400).json({
        success: false,
        error: "Slot is not available",
      });
    }

    // Update booked slots
    if (!slots_booked[slotDate]) {
      slots_booked[slotDate] = [];
    }
    slots_booked[slotDate].push(normalizedSlotTime);

    // Get user data
    const userData = await userModel.findById(userId).select("-password");
    if (!userData) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Create appointment
    const appointment = {
      userId,
      docId,
      userData,
      docData: { ...docData.toObject(), slots_booked: undefined },
      slotDate,
      slotTime: normalizedSlotTime,
      amount: docData.fees,
      date: Date.now(),
    };
    const newAppointment = new appointmentModel(appointment);
    await newAppointment.save();

    // Update doctor's booked slots
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    return res.status(200).json({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return res.status(500).json({
      success: false,
      error: "An unexpected error occurred while booking appointment",
    });
  }
};
// api for list all appointments
const listAppointment = async (req, res) => {
  try {
    // Assuming authUser middleware sets req.user with the authenticated user's data
    const userId = req.user?.id; // Adjust based on how authUser sets the user data

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const appointments = await appointmentModel.find({ userId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//api for cancel appointment

const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    // Check if user is authenticated
    if (!req.user || !req.user._id) {
      console.error(
        "Auth middleware failed: req.user or req.user._id is undefined"
      );
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not authenticated",
      });
    }

    const userId = req.user._id.toString(); // Convert ObjectId to string

    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: "Appointment ID is required",
      });
    }

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Verify appointment belongs to requesting user
    if (!appointment.userId) {
      console.error(`Appointment ${appointmentId} has no userId`);
      return res.status(500).json({
        success: false,
        message: "Invalid appointment data: userId missing",
      });
    }

    if (appointment.userId !== userId) {
      console.warn(
        `Unauthorized attempt: appointment.userId (${appointment.userId}) does not match userId (${userId})`
      );
      return res.status(403).json({
        success: false,
        message: "Unauthorized to cancel this appointment",
      });
    }

    // Check if already cancelled
    if (appointment.cancelled) {
      return res.status(400).json({
        success: false,
        message: "Appointment already cancelled",
      });
    }

    // Update appointment status
    const updatedAppointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { cancelled: true, status: "cancelled" },
      { new: true }
    );

    // Release doctor slot
    const { docId, slotDate, slotTime } = appointment;
    await doctorModel.findByIdAndUpdate(docId, {
      $pull: { [`slots_booked.${slotDate}`]: slotTime },
    });

    res.json({
      success: true,
      message: "Appointment cancelled",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error("Cancel appointment error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//api to make payment

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const stripePayment = async (req, res) => {
//   try {
//     const { appointmentId } = req.body;
//     const userId = req.user.id;

//     // Validate appointment exists and belongs to user
//     const appointment = await appointmentModel.findOne({
//       _id: appointmentId,
//       userId,
//     });

//     if (!appointment) {
//       return res.status(404).json({
//         success: false,
//         error: "Appointment not found",
//       });
//     }

//     if (appointment.cancelled) {
//       return res.status(400).json({
//         success: false,
//         error: "Cannot pay for cancelled appointment",
//       });
//     }

//     if (appointment.paid) {
//       return res.status(400).json({
//         success: false,
//         error: "Appointment already paid",
//       });
//     }

//     // Create Checkout Session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: `Appointment with ${appointment.docData.name}`,
//               description: `Appointment on ${appointment.slotDate} at ${appointment.slotTime}`,
//             },
//             unit_amount: appointment.amount * 100, // in cents
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       metadata: {
//         appointmentId: appointmentId.toString(),
//         userId: userId.toString(),
//       },
//       success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.FRONTEND_URL}/myappointments?payment=canceled`,
//     });

//     return res.status(200).json({
//       success: true,
//       sessionId: session.id,
//       url: session.url,
//     });
//   } catch (error) {
//     console.error("Stripe error:", error);
//     return res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// const verifyPayment = async (req, res) => {
//   try {
//     const { sessionId } = req.body;
//     const userId = req.user.id;

//     if (!sessionId) {
//       return res.status(400).json({
//         success: false,
//         error: "Session ID is required",
//       });
//     }

//     // Retrieve the session from Stripe
//     const session = await stripe.checkout.sessions.retrieve(sessionId, {
//       expand: ["payment_intent"],
//     });

//     // Verify the payment was successful
//     if (session.payment_status !== "paid") {
//       return res.status(400).json({
//         success: false,
//         error: "Payment not completed",
//       });
//     }

//     // Get appointment ID from metadata
//     const appointmentId = session.metadata.appointmentId;

//     // Verify the appointment belongs to the user
//     const appointment = await appointmentModel.findOneAndUpdate(
//       {
//         _id: appointmentId,
//         userId,
//       },
//       {
//         $set: {
//           paid: true,
//           paymentId: session.payment_intent.id,
//           paymentDate: new Date(),
//           status: "confirmed",
//         },
//       },
//       { new: true } // Return the updated document
//     );

//     if (!appointment) {
//       return res.status(404).json({
//         success: false,
//         error: "Appointment not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       paid: true,
//       appointment,
//     });
//   } catch (error) {
//     console.error("Payment verification error:", error);
//     return res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };
const stripePayment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.user.id;

    // Validate appointmentId
    if (!appointmentId || !ObjectId.isValid(appointmentId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid appointment ID",
      });
    }

    // Validate appointment exists and belongs to user
    const appointment = await appointmentModel.findOne({
      _id: appointmentId,
      userId,
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: "Appointment not found or does not belong to user",
      });
    }

    // Check if appointment is cancelled
    if (appointment.cancelled) {
      return res.status(400).json({
        success: false,
        error: "Cannot pay for cancelled appointment",
      });
    }

    // Check if appointment is already paid
    if (appointment.payment) {
      return res.status(400).json({
        success: false,
        error: "Appointment already paid",
      });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Appointment with ${appointment.docData.name}`,
              description: `Appointment on ${appointment.slotDate} at ${appointment.slotTime}`,
            },
            unit_amount: appointment.amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        appointmentId: appointmentId.toString(),
        userId: userId.toString(),
      },
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}&appointment_id=${appointmentId}`,
      cancel_url: `${process.env.FRONTEND_URL}/myappointments?payment=canceled`,
    });

    console.log(
      `Stripe session created: ${session.id} for appointment: ${appointmentId}, user: ${userId}`
    );

    return res.status(200).json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error(
      `Stripe payment error for appointment ${req.body.appointmentId}:`,
      error.message
    );
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to create payment session",
    });
  }
};

// Verify Stripe payment and update appointment status
const verifyPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const userId = req.user.id;

    // Validate sessionId
    if (!sessionId || typeof sessionId !== "string") {
      console.error(`Invalid sessionId received: ${sessionId}`);
      return res.status(400).json({
        success: false,
        error: "Valid session ID is required",
      });
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });

    // Verify payment was successful
    if (session.payment_status !== "paid") {
      console.error(`Payment not completed for session: ${sessionId}`);
      return res.status(400).json({
        success: false,
        error: "Payment not completed",
      });
    }

    // Verify userId from metadata
    if (session.metadata.userId !== userId) {
      console.error(
        `Unauthorized session ${sessionId} for user ${userId}, expected ${session.metadata.userId}`
      );
      return res.status(403).json({
        success: false,
        error: "Unauthorized: Session does not belong to user",
      });
    }

    // Get appointment ID from metadata
    const appointmentId = session.metadata.appointmentId;

    // Validate appointmentId
    if (!ObjectId.isValid(appointmentId)) {
      console.error(
        `Invalid appointmentId in session metadata: ${appointmentId}`
      );
      return res.status(400).json({
        success: false,
        error: "Invalid appointment ID in session metadata",
      });
    }

    // Update appointment with payment details
    const appointment = await appointmentModel.findOneAndUpdate(
      {
        _id: appointmentId,
        userId,
      },
      {
        $set: {
          payment: true,
          paymentId: session.payment_intent.id,
          paymentDate: new Date(),
          status: "confirmed",
        },
      },
      { new: true }
    );

    if (!appointment) {
      console.error(
        `Appointment not found for ID ${appointmentId} and user ${userId}`
      );
      return res.status(404).json({
        success: false,
        error: "Appointment not found or does not belong to user",
      });
    }

    console.log(
      `Payment verified for session ${sessionId}, appointment ${appointmentId}, user ${userId}`
    );

    return res.status(200).json({
      success: true,
      payment: true,
      appointment: {
        _id: appointment._id,
        docData: appointment.docData,
        slotDate: appointment.slotDate,
        slotTime: appointment.slotTime,
        amount: appointment.amount,
        paymentDate: appointment.paymentDate,
        paymentId: appointment.paymentId,
        payment: appointment.payment,
        status: appointment.status,
        date: appointment.date,
        cancelled: appointment.cancelled,
      },
    });
  } catch (error) {
    console.error(
      `Payment verification error for session ${req.body.sessionId}:`,
      error.message
    );
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to verify payment",
    });
  }
};
export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  stripePayment,
  verifyPayment,
};
