import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const savedFile = await prisma.file.create({
      data: {
        filename: file.filename,
        originalName: file.originalname,
        path: file.path,
        size: file.size,
        mimeType: file.mimetype,
      },
    });

    res.status(201).json(savedFile);
  } catch (error) {
    res.status(500).json({
      message: "Upload failed",
    });
  }
};
