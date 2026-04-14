// src/controllers/likeController.ts
import { Request, Response } from "express";
import { prisma } from "../prisma";

export const likePost = async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { postId } = req.body;

  try {
    const like = await prisma.like.create({
      data: {
        userId,
        postId: Number(postId),
      },
    });

    res.json(like);
  } catch (err) {
    // handles duplicate like error
    res.status(400).json({ message: "Already liked" });
  }
};


export const unlikePost = async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const { postId } = req.body;

  await prisma.like.delete({
    where: {
      userId_postId: {
        userId,
        postId: Number(postId),
      },
    },
  });

  res.json({ message: "Unliked" });
};


export const countLikes = async (req: Request, res: Response) => {
  const { postId } = req.params;

  const count = await prisma.like.count({
    where: { postId: Number(postId) },
  });

  res.json({ count });
};