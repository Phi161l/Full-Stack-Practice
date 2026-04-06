import { Request, Response } from "express";
import * as service from "../services/library.service";

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { userId, bookId } = req.body;
    const loan = await service.borrowBook(userId, bookId);
    res.json(loan);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const returnBook = async (req: Request, res: Response) => {
  const { loanId } = req.body;
  const loan = await service.returnBook(loanId);
  res.json(loan);
};

export const getLoans = async (req: Request, res: Response) => {
  const loans = await service.getLoans();
  res.json(loans);
};