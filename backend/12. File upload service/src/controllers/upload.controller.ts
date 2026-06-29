import { Request, Response } from "express";
import {prisma} from "../lib/prisma.js";
import { uploadToCloudinary } from "../services/storage.service.js";

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    // Upload the local file to Cloudinary
    const cloudFile = await uploadToCloudinary(file.path);

    // Save metadata to the database
    const savedFile = await prisma.file.create({
      data: {
        filename: file.filename,
        originalName: file.originalname,
        path: file.path,
        size: file.size,
        mimeType: file.mimetype,
        cloudUrl: cloudFile.url,
        publicId: cloudFile.publicId,
      },
    });

    res.status(201).json(savedFile);
  } catch (error) {
    res.status(500).json({
      message: "Upload failed",
    });
  }
};
