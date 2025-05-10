import express from "express";
import upload from "../middlewares/multer.js";
import {
  addDoctor,
  adminAppointments,
  adminDashboard,
  adminLogin,
  allDoctors,
  appointmentCancel,
} from "../controllers/adminController.js";
import adminAuth from "../middlewares/adminAuth.js";
import { changeAvailability } from "../controllers/doctorController.js";
const adminRouter = express.Router();

//add doctor
adminRouter.post("/add-doctor", adminAuth, upload.single("image"), addDoctor);
adminRouter.post("/login", adminLogin);
adminRouter.post("/all-doctors", adminAuth, allDoctors);
adminRouter.post("/change-availability", adminAuth, changeAvailability);
adminRouter.get("/appointments", adminAuth, adminAppointments);
adminRouter.post("/cancel-appointment", adminAuth, appointmentCancel);
adminRouter.get("/dashboard", adminAuth, adminDashboard);
export default adminRouter;
