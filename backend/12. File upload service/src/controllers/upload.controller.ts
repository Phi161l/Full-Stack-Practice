import { Request, Response } from "express";

export const uploadFile = (req: Request, res: Response) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({
    message: "File uploaded successfully",
    file: {
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      path: file.path,
    },
  });
};