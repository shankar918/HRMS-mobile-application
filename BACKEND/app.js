// --- START OF FILE app.js ---

import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";

// Import Routes
import AdminAttendanceRoutes from "./routes/AdminAttendanceRoutes.js";
import EmployeeattendanceRoutes from "./routes/EmployeeattendanceRoutes.js";
import profilePicRoutes from "./routes/ProfilePicRoute.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import categoryAssignmentRoutes from "./routes/categoryAssignmentRoutes.js";
import chatRoutes from "./routes/chat.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import holidayRoutes from "./routes/holidayRoutes.js";
import idleTimeRoutes from "./routes/idleTimeRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import meetingRoutes from "./routes/meetingRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import overtimeRoutes from "./routes/overtimeRoutes.js";
import payrollRoutes from './routes/payroll.js';
import punchOutRoutes from './routes/punchOutRequestRoutes.js';
import requestWorkModeRoutes from "./routes/requestWorkModeRoutes.js";
import rulesRoutes from './routes/rules.js';
import shiftRoutes from "./routes/shiftRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const server = http.createServer(app);

// -------------------- CORS CONFIGURATION --------------------
// ✅ Defined globally so both Express and Socket.io use the same list
const allowedOrigins = [
  "https://hrms-420.netlify.app",    // Your Production Frontend
  "http://localhost:5173",           // Your Local Frontend
  "https://hrms-ask.onrender.com",   // Your Self/Backend
  "http://localhost:5000"  ,
   "http://localhost:8081",          // ✅ EXPO WEB
   "http://localhost:19006",         // ✅ EXPO OLD

  "https://hrms-ask-1.onrender.com"          // Local Backend
];

// ===================================================================
// ✅ SOCKET.IO SETUP
// ===================================================================
const userSocketMap = new Map(); // Stores { userId -> socketId }

const io = new Server(server, {
  cors: {
    origin: allowedOrigins, // ✅ Updated to match Express CORS for security
    methods: ["GET", "POST"],
    credentials: true
  },
});

// Make io instance and the user map available to all routes
app.set("io", io);
app.set("userSocketMap", userSocketMap);

io.on("connection", (socket) => {
  console.log("🔥 User connected:", socket.id);

  socket.on('register', (userId) => {
    if (userId) {
      console.log(`✍️  Registering user ${userId} with socket ${socket.id}`);
      userSocketMap.set(userId.toString(), socket.id);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    for (let [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  });
});

// -------------------- EXPRESS MIDDLEWARE --------------------

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// -------------------- Security Headers --------------------
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// -------------------- DATABASE --------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Database Connected Successfully"))
  .catch((err) => {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  });

// -------------------- Health Check --------------------
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// -------------------- ROUTES --------------------
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/holidays", holidayRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/overtime", overtimeRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/attendance", EmployeeattendanceRoutes);
app.use("/api/admin/attendance", AdminAttendanceRoutes);
app.use("/api/profile", profilePicRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/idletime", idleTimeRoutes); // ✅ Added /api/ prefix for consistency
app.use("/api/shifts", shiftRoutes);
app.use("/api/category-assign", categoryAssignmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/work-mode", requestWorkModeRoutes);
app.use('/api/punchoutreq', punchOutRoutes); 
app.use("/api/groups", groupRoutes);
app.use('/api/meetings', meetingRoutes); 
app.use('/api/rules', rulesRoutes);
app.use("/api/chat", chatRoutes);
app.use('/api/payroll', payrollRoutes);
// app.use("/api/companies", companyRoutes);



// -------------------- 404 Handler --------------------
app.use("*", (req, res) => {
  res.status(404).json({ success: false, message: "API route not found" });
});

// -------------------- Global Error Handler --------------------
app.use((err, req, res, next) => {
  console.error("🚨 Global Error Handler:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "An unexpected error occurred",
  });
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running with Socket.io on port ${PORT}`);
});

// -------------------- EXPRESS MIDDLEWARE --------------------

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// IMPORTANT: allow preflight
app.options("*", cors());
