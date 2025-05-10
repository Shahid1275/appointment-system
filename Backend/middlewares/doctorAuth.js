import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorsModel.js"; // Use doctorModel to align with doctorController

const authDoctor = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.replace("Bearer ", "") || req.headers.dtoken;
    console.log("[authDoctor] Token:", token);

    if (!token) {
      console.error("[AUTH ERROR] No token provided");
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("[authDoctor] Decoded JWT:", decoded);

    if (!decoded.id) {
      console.error("[AUTH ERROR] Invalid token payload");
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const doctor = await doctorModel.findById(decoded.id);
    console.log("[authDoctor] Doctor found:", doctor);

    if (!doctor) {
      console.error(`[AUTH ERROR] Doctor not found for id: ${decoded.id}`);
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: Doctor not found" });
    }

    req.user = doctor;
    next();
  } catch (error) {
    console.error("[AUTH ERROR]", error.message);
    const message =
      error.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
    return res.status(401).json({
      success: false,
      message,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export default authDoctor;
