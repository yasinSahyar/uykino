import { Router, Request, Response } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { createS3Client, getS3Url } from "../config/s3";

const router = Router();

// Initialize S3 client
const s3 = createS3Client();

// Multer S3 upload configuration for videos
const videoUpload = multer({
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

// Multer S3 upload configuration for images
const imageUpload = multer({
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

// POST upload video
router.post("/video", videoUpload.single("video"), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        error: "No video file provided",
      });
      return;
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
      error: "Failed to upload video",
      details: String(error),
    });
  }
});

// POST upload image
router.post("/image", imageUpload.single("image"), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        error: "No image file provided",
      });
      return;
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
      error: "Failed to upload image",
      details: String(error),
    });
  }
});

export default router;
