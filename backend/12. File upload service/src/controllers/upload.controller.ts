import { Request, Response } from "express";
import {prisma} from "../lib/prisma";

export const uploadFile = async (req: Request, res: Response) => {
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
};
