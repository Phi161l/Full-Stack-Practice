import { Request, Response } from "express";
import * as service from "../services/library.service";

export const getUsers = async (req: Request, res: Response) => {
  const users = await service.getUsers();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const user = await service.createUser(req.body);
  res.json(user);
};