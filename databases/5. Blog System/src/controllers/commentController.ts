import { Request, Response } from "express";
import { prisma } from "../prisma";

export const addComment = async (req: Request, res: Response) => {
  const { content, postId } = req.body;
  const userId = req.user!.userId;

  const comment = await prisma.comment.create({
    data: {
      content,
      postId: Number(postId),
      authorId: userId,
    },
  });

  res.json(comment);
};

export const getComments = async (req: Request, res: Response) => {
  const { postId } = req.params;

  const comments = await prisma.comment.findMany({
    where: { postId: Number(postId) },
    include: {
      author: true,
    },
  });

  res.json(comments);
};


export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.userId;

  const comment = await prisma.comment.findUnique({
    where: { id: Number(id) },
  });

  if (!comment || comment.authorId !== userId) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await prisma.comment.delete({
    where: { id: Number(id) },
  });

  res.json({ message: "Comment deleted" });
};