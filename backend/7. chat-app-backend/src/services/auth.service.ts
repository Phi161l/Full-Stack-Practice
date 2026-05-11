import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { TokenService } from "./token.service.js";

export class AuthService {
  static async register(data: any) {
    const existingUser = await User.findOne({
      email: data.email,
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
      ...data,
      password: hashedPassword,
    });

    const token = TokenService.generateToken(user._id.toString());

    return {
      token,
      user,
    };
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = TokenService.generateToken(user._id.toString());

    return {
      token,
      user,
    };
  }
}
