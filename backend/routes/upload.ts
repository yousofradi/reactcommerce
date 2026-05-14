import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// import adminAuth from '../middleware/adminAuth'; // TODO: Implement admin auth

const router = express.Router();

// ── Storage Configuration ────────────────────────────────

const isCloudinaryConfigured = process.env.CLOUDINARY_CLOUD_NAME && 
                               process.env.CLOUDINARY_API_KEY && 
                               process.env.CLOUDINARY_API_SECRET;

let storage: multer.StorageEngine;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'ecommerce-uploads',
      allowed_formats: ['jpg', 'png', 'gif', 'webp', 'jpeg'],
      public_id: (req: any, file: any) => {
        return Date.now() + '-' + Math.round(Math.random() * 1E9);
      }
    }
  });
  console.log('✅ Upload: Using Cloudinary storage');
} else {
  const uploadDir = path.join(__dirname, '../../uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
  console.log('⚠️ Upload: Cloudinary not configured, using local disk storage');
}

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// ── Routes ───────────────────────────────────────────────

router.post('/', upload.single('image'), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    let imageUrl = req.file.path;
    
    if (!isCloudinaryConfigured) {
      const host = req.get('host');
      const protocol = (req.headers['x-forwarded-proto'] || req.protocol || 'http').toString().split(',')[0];
      const finalProtocol = (host?.includes('render.com') || host?.includes('onrender.com')) ? 'https' : protocol;
      imageUrl = `${finalProtocol}://${host}/uploads/${req.file.filename}`;
    }
    
    res.json({ 
      url: imageUrl,
      filename: req.file.filename || (req.file as any).public_id
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Upload failed: ' + err.message });
  }
});

export default router;
