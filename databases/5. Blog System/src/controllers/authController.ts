import { prisma } from "../prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    // check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user + account
    const user = await prisma.user.create({
      data: {
        name,
        email,
        accounts: {
          create: {
            provider: "email",
            providerId: email,
            password: hashedPassword,
          },
        },
      },
    });

    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // find account
    const account = await prisma.account.findFirst({
      where: {
        provider: "email",
        providerId: email,
      },
      include: { user: true },
    });

    if (!account) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, account.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate token
    const token = jwt.sign(
      { userId: account.user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.json({ token, user: account.user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};