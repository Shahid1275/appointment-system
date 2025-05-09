import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoutes.js";
import doctorRouter from "./routes/doctorRoutes.js";
import userRouter from "./routes/userRoute.js";

const app = express();
const port = process.env.PORT || 3000;

// Connect to database and Cloudinary
connectDB();
connectCloudinary();

// Define allowed origins
const allowedOrigins = [
  "http://localhost:5173", // User frontend
  "http://localhost:5174", // Admin frontend
];

// Configure CORS
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., Postman) or from allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token", "atoken"],
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// API user routes
app.use("/api/user", userRouter);

// API endpoints
app.use("/admin", adminRouter);
app.use("/api/doctors", doctorRouter);
app.get("/", (req, res) => {
  res.send("API is working Good 👍");
});

app.listen(port, () => {
  console.log(`Server running on port ${port} 👍`);
});
