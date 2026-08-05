import type { NextFunction, Request, Response } from "express"
import createHttpError from "http-errors";
import User from "./userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  // Check if req.body exists and is an object
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
    const error = createHttpError(400, "Request body is required");
    return next(error);
  }

  const { name, email, password } = req.body;

  // validation
  if (!name || !email || !password) {
    const error = createHttpError(400, "all fields are required");
    return next(error);
  }

  try {
    // hash password before saving 
    const hashedPassword = await bcrypt.hash(password, 10);

    // single create call with hashed password
    const newUser = await User.create({ name, email, password: hashedPassword });

    // generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    // send response 
    return res.status(201).json({ user: newUser, token });
  } catch (err: any) {
    // handle duplicate email (code 11000) 
    if (err.code === 11000) {
      const error = createHttpError(409, "user already exists");
      return next(error);
    }
    next(err);
  }
};

export { createUser };
