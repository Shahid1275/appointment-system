import express from "express";
import {
  appointmentCancel,
  appointmentComplete,
  appointmentsDoctor,
  doctorList,
  doctorLogin,
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/doctorAuth.js";

const doctorRouter = express.Router();
doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", doctorLogin);
doctorRouter.get("/all-appointments", authDoctor, appointmentsDoctor);
doctorRouter.post("/appointment-complete", authDoctor, appointmentComplete);
doctorRouter.post("/appointment-cancel", authDoctor, appointmentCancel);
export default doctorRouter;
