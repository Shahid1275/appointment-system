import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { atoken } = req.headers;

    if (!atoken) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Verify and decode the token
    const decoded = jwt.verify(atoken, process.env.JWT_SECRET);

    // Check if the email in token matches admin email
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({
        success: false,
        message: "Invalid token - unauthorized user",
      });
    }

    // If everything is valid, proceed
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message.includes("jwt expired")
        ? "Token expired"
        : "Invalid token",
    });
  }
};

export default adminAuth;
