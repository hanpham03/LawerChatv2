// Load environment variables FIRST before any other imports
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// Import routes
import sessionsRouter from "./routes/sessions";
import messagesRouter from "./routes/messages";
import chatRouter from "./routes/chat";

// Import database config and test connection
import { testConnection } from "./config/database";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://lawerchatv2frontend-git-main-hoaihanphamk123-gmailcoms-projects.vercel.app",
      "https://lawerchatv2frontend-h8zsf5j5e.vercel.app",
    ],
    credentials: true,
  })
);
app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || "development",
  });
});

// API routes
app.get("/api", (req, res) => {
  res.json({
    message: "LawerChatV2 Backend API",
    version: "1.0.0",
    endpoints: {
      sessions: "/api/sessions",
      messages: "/api/messages",
      chat: "/api/chat",
      health: "/health",
    },
  });
});

app.use("/api/sessions", sessionsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/chat", chatRouter);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.originalUrl} not found`,
    available_routes: [
      "GET /health",
      "GET /api",
      "GET /api/sessions",
      "POST /api/sessions",
      "GET /api/sessions/:id",
      "PUT /api/sessions/:id",
      "DELETE /api/sessions/:id",
      "GET /api/sessions/:id/messages",
      "GET /api/messages",
      "POST /api/messages",
      "DELETE /api/messages/:id",
      "POST /api/chat",
      "POST /api/chat/test",
    ],
  });
});

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Unhandled error:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Something went wrong",
    });
  }
);

// Start server
const startServer = async () => {
  try {
    console.log("🚀 Starting LawerChatV2 Backend Server...");

    // Test database connection
    console.log("📡 Testing database connection...");
    const dbConnected = await testConnection();

    if (!dbConnected) {
      console.warn("⚠️  Database connection failed, but server will continue");
    }

    // Start server
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
      console.log(`🔍 Health Check: http://localhost:${PORT}/health`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  process.exit(0);
});

// Start the server
startServer();
