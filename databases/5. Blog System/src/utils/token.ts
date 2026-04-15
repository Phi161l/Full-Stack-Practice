import jwt from "jsonwebtoken";
import crypto from "crypto";

export const generateAccessToken = (userId: number, role: string) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET as string,
    { expiresIn: "15m" }
  );
};

export const generateRefreshToken = () => {
  return crypto.randomBytes(40).toString("hex");
};
