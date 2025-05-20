import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoutes.js";
import doctorRouter from "./routes/doctorRoutes.js";
import userRouter from "./routes/userRoute.js";

const app = express();

// Connect to database and Cloudinary
connectDB();
connectCloudinary();

// Configure CORS
const corsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token", "atoken"],
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// API routes
app.use("/api/user", userRouter);
app.use("/admin", adminRouter);
app.use("/api/doctors", doctorRouter);
app.get("/", (req, res) => {
  res.send("API is working Good 👍");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port} 👍`);
});
