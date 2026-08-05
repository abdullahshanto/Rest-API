import type { NextFunction, Request, Response } from "express"
import createHttpError from "http-errors";
import User from "./userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  // validation
  if (!name || !email || !password) {
    const error = createHttpError(400, "all fields are required");
    return next(error);
  }

  try {
    // hash password before saving (previous code created user with plain text password first, then again with hash)
    const hashedPassword = await bcrypt.hash(password, 10);

    // single create call with hashed password
    const newUser = await User.create({ name, email, password: hashedPassword });

    // generate JWT token (fixed: was using undefined `sign()` and `config.jssecret`)
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    // send response (previous code never called res.json — client request hung)
    return res.status(201).json({ user: newUser, token });
  } catch (err: any) {
    // handle duplicate email (code 11000) — previous `!createdUser` check never worked
    if (err.code === 11000) {
      const error = createHttpError(409, "user already exists");
      return next(error);
    }
    next(err);
  }
};

export { createUser };
