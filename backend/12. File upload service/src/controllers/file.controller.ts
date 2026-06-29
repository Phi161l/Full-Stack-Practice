import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const getFileById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  console.log("clicked")

  const file = await prisma.file.findUnique({
    where: {
      id,
    },
  });

  if (!file) {
    return res.status(404).json({
      message: "File not found",
    });
  }

  res.json(file);
};

export const downloadFile = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  console.log("HI")

  const file = await prisma.file.findUnique({
    where: {
      id,
    },
  });

  if (!file) {
    return res.status(404).json({
      message: "File not found",
    });
  }

  res.download(file.path);
};
