import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";

const router = Router();

// Create in-memory storage for mock uploads
const mockStorage: Map<string, { url: string; filename: string }> = new Map();

// Memory storage for multer
const memoryStorage = multer.memoryStorage();

const videoUpload = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 * 1024, // 5GB
  },
  fileFilter: (_req: any, file: any, cb: any) => {
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only video files are allowed"));
    }
  },
});

const imageUpload = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
  fileFilter: (_req: any, file: any, cb: any) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// POST upload video (mock)
router.post("/video", (req: Request, res: Response) => {
  videoUpload.single("video")(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: "Video upload failed",
        details: err.message || String(err),
      });
    }

    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: "No video file provided",
        });
      }

      // Generate a mock URL (data URL or blob URL reference)
      const fileId = `video_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      const mockUrl = `/api/mock-files/${fileId}`;

      // Store the file in memory
      mockStorage.set(fileId, {
        url: mockUrl,
        filename: req.file.originalname,
      });

      res.json({
        success: true,
        data: {
          url: mockUrl,
          key: fileId,
          filename: req.file.originalname,
          _demo: true,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to process video upload",
        details: String(error),
      });
    }
  });
});

// POST upload image (mock)
router.post("/image", (req: Request, res: Response) => {
  imageUpload.single("image")(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: "Image upload failed",
        details: err.message || String(err),
      });
    }

    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: "No image file provided",
        });
      }

      // Generate a mock URL
      const fileId = `image_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      const mockUrl = `/api/mock-files/${fileId}`;

      // Store the file in memory
      mockStorage.set(fileId, {
        url: mockUrl,
        filename: req.file.originalname,
      });

      res.json({
        success: true,
        data: {
          url: mockUrl,
          key: fileId,
          filename: req.file.originalname,
          _demo: true,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to process image upload",
        details: String(error),
      });
    }
  });
});

export default router;
export { mockStorage };
