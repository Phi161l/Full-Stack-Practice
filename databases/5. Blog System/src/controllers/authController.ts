import { prisma } from "../prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import validator from "validator";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({
      message: "Password not strong enough",
    });
  }

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

    // generate accessToken
    const accessToken = generateAccessToken(account.user.id, account.user.role);
    const refreshToken = generateRefreshToken();

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: account.user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    res.json({ accessToken, refreshToken, user: account.user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  const stored = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
  });

  if (!stored || stored.expiresAt < new Date()) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  const accessToken = generateAccessToken(stored.userId, "USER");

  res.json({ accessToken });
};
