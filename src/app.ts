import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { env } from "./config/env.js";
import apiRouter from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { apiRateLimiter } from "./middlewares/rateLimiter.middleware.js";
import { NotFoundError } from "./utils/appError.js";

const app: Express = express();

// Security Middlewares
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// CORS Configuration
const allowedOrigins = [
  env.FRONTEND_URL,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman) or whitelisted frontend
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in development, strict in production
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    maxAge: 86400,
  })
);

// Logging
if (env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Body Parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rate Limiting
app.use("/api", apiRateLimiter);

// Static Uploads Folder
const uploadsPath = path.resolve(env.UPLOAD_DIR);
app.use("/uploads", express.static(uploadsPath));

// API Routes
app.use("/api/v1", apiRouter);
app.use("/api", apiRouter); // Alias for flexible frontend integration

// Welcome / Root Endpoint
app.get("/", (req: Request, res: Response) => {
  res.json({
    service: "Custodian-AI Backend Sanctuary API",
    version: "1.0.0",
    docs: "/api/v1/health",
    endpoints: {
      auth: "/api/v1/auth",
      artworks: "/api/v1/artworks",
      pledges: "/api/v1/pledges",
      ateliers: "/api/v1/ateliers",
      ai: "/api/v1/ai",
      dashboard: "/api/v1/dashboard",
      uploads: "/api/v1/uploads",
    },
  });
});

// 404 Catch-All Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`Endpoint '${req.originalUrl}' does not exist`));
});

// Global Error Handler
app.use(errorHandler);

export default app;
