import { prisma } from "../prisma.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

// Forgot Password
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.json({ message: "If email exists, reset link sent" });
  }

  const token = crypto.randomBytes(32).toString("hex");

  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 10),
    },
  });

  console.log("RESET LINK:");
  console.log(`http://localhost:3000/reset-password?token=${token}`);

  res.json({ message: "Reset link sent to email" });
};


// Reset Password
export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  const resetRecord = await prisma.passwordResetToken.findUnique({
    where: { token },
  });

  if (!resetRecord) {
    return res.status(400).json({ message: "Invalid token" });
  }

  if (resetRecord.expiresAt < new Date()) {
    return res.status(400).json({ message: "Token expired" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.account.updateMany({
    where: {
      userId: resetRecord.userId,
      provider: "email",
    },
    data: {
      password: hashedPassword,
    },
  });

  await prisma.passwordResetToken.delete({
    where: { token },
  });

  res.json({ message: "Password updated successfully" });
};