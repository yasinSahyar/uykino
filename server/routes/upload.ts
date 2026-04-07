import { Router, Request, Response } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { createS3Client, getS3Url, validateAWSCredentials } from "../config/s3";

const router = Router();

// Validate AWS credentials before setting up routes
let s3: any = null;
let uploadError: string | null = null;

try {
  validateAWSCredentials();
  s3 = createS3Client();
} catch (error) {
  uploadError = error instanceof Error ? error.message : "Failed to initialize S3 client";
  console.error("S3 Initialization Error:", uploadError);
}

// Multer S3 upload configuration for videos (only if S3 is configured)
const createVideoUpload = () => {
  if (!s3) {
    return null;
  }
  return multer({
    storage: multerS3({
      s3: s3 as any,
      bucket: process.env.AWS_BUCKET_NAME || "sazkino-uploads",
      acl: "public-read",
      key: (_req: any, file: any, cb: any) => {
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(7);
        const filename = `videos/${timestamp}-${randomStr}-${file.originalname}`;
        cb(null, filename);
      },
      contentType: multerS3.AUTO_CONTENT_TYPE,
    }),
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
};

// Multer S3 upload configuration for images (only if S3 is configured)
const createImageUpload = () => {
  if (!s3) {
    return null;
  }
  return multer({
    storage: multerS3({
      s3: s3 as any,
      bucket: process.env.AWS_BUCKET_NAME || "sazkino-uploads",
      acl: "public-read",
      key: (_req: any, file: any, cb: any) => {
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(7);
        const filename = `images/${timestamp}-${randomStr}-${file.originalname}`;
        cb(null, filename);
      },
      contentType: multerS3.AUTO_CONTENT_TYPE,
    }),
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
};

const videoUpload = createVideoUpload();
const imageUpload = createImageUpload();

// POST upload video
router.post("/video", (req: Request, res: Response, next) => {
  // Check if S3 is configured
  if (uploadError || !videoUpload) {
    res.status(503).json({
      success: false,
      error: "Upload service not available",
      details: uploadError || "AWS S3 not configured",
      help: "Please set AWS credentials: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME",
    });
    return;
  }

  // Process the upload
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

      const fileUrl = (req.file as any).location ||
        getS3Url(process.env.AWS_BUCKET_NAME || "sazkino-uploads", (req.file as any).key);

      res.json({
        success: true,
        data: {
          url: fileUrl,
          key: (req.file as any).key,
          filename: req.file.originalname,
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

// POST upload image
router.post("/image", (req: Request, res: Response, next) => {
  // Check if S3 is configured
  if (uploadError || !imageUpload) {
    res.status(503).json({
      success: false,
      error: "Upload service not available",
      details: uploadError || "AWS S3 not configured",
      help: "Please set AWS credentials: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME",
    });
    return;
  }

  // Process the upload
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

      const fileUrl = (req.file as any).location ||
        getS3Url(process.env.AWS_BUCKET_NAME || "sazkino-uploads", (req.file as any).key);

      res.json({
        success: true,
        data: {
          url: fileUrl,
          key: (req.file as any).key,
          filename: req.file.originalname,
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
