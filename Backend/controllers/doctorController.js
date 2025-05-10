import doctorModel from "../models/doctorsModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    if (!docData) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res
      .status(200)
      .json({ success: true, message: "Availability changed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password -email");
    if (!doctors.length) {
      return res
        .status(200)
        .json({ success: true, data: [], message: "No doctors found" });
    }
    res.json({ success: true, data: doctors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if doctor exists
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Recommended to add expiration
    });

    // Successful login response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        // Add other relevant doctor fields if needed
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { changeAvailability, doctorList, doctorLogin };
