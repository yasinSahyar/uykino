import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import moviesRouter from "./routes/movies";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Upload API routes - use AWS if configured, otherwise use mock for testing
  const hasAWSCredentials =
    process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY;

  if (hasAWSCredentials) {
    import("./routes/upload")
      .then((module) => {
        app.use("/api/upload", module.default);
        console.log("✓ Using AWS S3 for file uploads");
      })
      .catch((err) => {
        console.warn("Failed to load AWS upload routes, using mock mode:", err.message);
        // Fallback to mock
        import("./routes/upload-mock").then((module) => {
          app.use("/api/upload", module.default);
        });
      });
  } else {
    // Use mock uploads for testing when AWS credentials are not available
    import("./routes/upload-mock")
      .then((module) => {
        app.use("/api/upload", module.default);
        console.log("⚠ Using DEMO MODE for uploads (files stored in memory only)");
        console.log(
          "   To use AWS S3, set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables"
        );
      })
      .catch((err) => {
        console.error("Failed to load upload routes:", err);
      });
  }

  // Movies API routes
  app.use("/api/movies", moviesRouter);

  return app;
}
