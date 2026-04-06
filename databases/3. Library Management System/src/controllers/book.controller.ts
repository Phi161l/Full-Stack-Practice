import { Request, Response } from "express";
import * as service from "../services/library.service";

export const getBooks = async (req: Request, res: Response) => {
  const books = await service.getBooks();
  res.json(books);
};

export const createBook = async (req: Request, res: Response) => {
  const book = await service.createBook(req.body);
  res.json(book);
};