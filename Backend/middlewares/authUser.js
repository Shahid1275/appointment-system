import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authUser = async (req, res, next) => {
  try {
    // 1. Get token from headers
    const authHeader = req.headers.authorization || req.headers.token;

    if (!authHeader) {
      console.error("[AUTH ERROR] No token provided in headers");
      return res.status(401).json({
        success: false,
        message: "Authorization token not found",
      });
    }

    // 2. Extract token (handle "Bearer " prefix if present)
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    if (!token) {
      console.error("[AUTH ERROR] Malformed token");
      return res.status(401).json({
        success: false,
        message: "Malformed token",
      });
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      console.error("[AUTH ERROR] Token payload missing id");
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    // 4. Fetch user from database
    const user = await userModel.findById(decoded.id);
    if (!user) {
      console.error(`[AUTH ERROR] User not found for id: ${decoded.id}`);
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // 5. Attach full user to request
    req.user = user; // Includes _id as ObjectId

    // 6. Proceed to next middleware
    next();
  } catch (error) {
    console.error("[AUTH ERROR]", error.message);

    // Handle specific JWT errors
    let message = "Invalid token";
    if (error instanceof jwt.JsonWebTokenError) {
      if (error.message.includes("expired")) {
        message = "Token expired";
      } else if (error.message.includes("malformed")) {
        message = "Malformed token";
      }
    }

    return res.status(401).json({
      success: false,
      message,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export default authUser;
