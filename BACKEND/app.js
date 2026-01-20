// --- START OF FILE app.js ---

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";

// Routes
import employeeRoutes from "./routes/employeeRoutes.js";
import holidayRoutes from "./routes/holidayRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import overtimeRoutes from "./routes/overtimeRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import EmployeeattendanceRoutes from "./routes/EmployeeattendanceRoutes.js";
import AdminAttendanceRoutes from "./routes/AdminAttendanceRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import profilePicRoutes from "./routes/ProfilePicRoute.js";
import idleTimeRoutes from "./routes/idleTimeRoutes.js";
import shiftRoutes from "./routes/shiftRoutes.js";
import categoryAssignmentRoutes from "./routes/categoryAssignmentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import requestWorkModeRoutes from "./routes/requestWorkModeRoutes.js";
import punchOutRoutes from "./routes/punchOutRequestRoutes.js";
import meetingRoutes from "./routes/meetingRoutes.js";

const app = express();
const server = http.createServer(app);

/* =========================================================
   ✅ CORS — VERY IMPORTANT (FIXES YOUR ISSUE)
========================================================= */
app.use(
  cors({
    origin: "*", // allow ALL (web + mobile + expo)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Handle preflight requests
app.options("*", cors());

/* =========================================================
   ✅ BODY PARSERS
========================================================= */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* =========================================================
   ✅ SOCKET.IO
========================================================= */
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const userSocketMap = new Map();
app.set("io", io);
app.set("userSocketMap", userSocketMap);

io.on("connection", (socket) => {
  console.log("🔥 User connected:", socket.id);

  socket.on("register", (userId) => {
    if (userId) {
      userSocketMap.set(userId.toString(), socket.id);
    }
  });

  socket.on("disconnect", () => {
    for (let [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
    console.log("❌ User disconnected:", socket.id);
  });
});

/* =========================================================
   ✅ DATABASE
========================================================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Database Connected Successfully"))
  .catch((err) => {
    console.error("❌ Mongo error:", err);
    process.exit(1);
  });

/* =========================================================
   ✅ HEALTH CHECK
========================================================= */
app.get("/health", (req, res) => {
  res.json({ success: true, message: "Server running" });
});

/* =========================================================
   ✅ API ROUTES
========================================================= */
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
app.use("/api/idletime", idleTimeRoutes);
app.use("/api/shifts", shiftRoutes);
app.use("/api/category-assign", categoryAssignmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/work-mode", requestWorkModeRoutes);
app.use("/api/punchoutreq", punchOutRoutes);
app.use("/api/meetings", meetingRoutes);

/* =========================================================
   ❌ 404 HANDLER
========================================================= */
app.use("*", (req, res) => {
  res.status(404).json({ success: false, message: "API route not found" });
});

/* =========================================================
   🚀 START SERVER
========================================================= */
const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// --- END OF FILE ---
