import mongoose from "mongoose";
import validator from "validator"; // Correct import

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v), // Validate if email is in correct format
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    speciality: {
      type: String, // Array of strings for specialties
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true, // Correct default
    },
    fees: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
    slots_booked: {
      type: Object,
      default: {}, // Default empty object for slots_booked
    },
  },
  { minimize: false }
);

const doctorModel =
  mongoose.models.doctor || mongoose.model("doctor", doctorSchema);

export default doctorModel;
