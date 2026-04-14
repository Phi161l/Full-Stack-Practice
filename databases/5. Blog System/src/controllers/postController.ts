import { request } from "express";
import { prisma } from "../prisma.js";
import { Request, Response } from "express";

export const createPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const userId = req.user.userId; // from JWT middleware

  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: userId,
    },
  });

  res.json(post);
};

export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
      likes: true,
      comments: true,
    },
  });

  res.json(posts);
};

export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
    include: {
      author: true,
      comments: true,
      likes: true,
    },
  });

  res.json(post);
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.user.userId;

  // check ownership
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });

  if (!post || post.authorId !== userId) {
    return res.status(403).json({ message: "Not allowed" });
  }

  const updated = await prisma.post.update({
    where: { id: Number(id) },
    data: { title, content },
  });

  res.json(updated);
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user.userId;

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });

  if (!post || post.authorId !== userId) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await prisma.post.delete({
    where: { id: Number(id) },
  });

  res.json({ message: "Post deleted" });
};
