import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import User from "./userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../src/config/config.js";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  // Check if req.body exists and is an object
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
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
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // generate JWT token
    const token = jwt.sign({ userId: newUser._id }, config.jssecret as string, {
      expiresIn: "1h",
    });

    // send response (exclude password from response)
    return res.status(201).json({
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
      token,
    });
  } catch (err: any) {
    // handle duplicate email (code 11000)
    if (err.code === 11000) {
      const error = createHttpError(409, "user already exists");
      return next(error);
    }
    next(err);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  // Check if req.body exists and is an object
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    const error = createHttpError(400, "Request body is required");
    return next(error);
  }

  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    const error = createHttpError(400, "all fields are required");
    return next(error);
  }

  try {
    // find user by email
    const user = await User.findOne({ email });
    if (!user) {
      const error = createHttpError(401, "invalid credentials");
      return next(error);
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = createHttpError(401, "invalid credentials");
      return next(error);
    }

    // generate JWT token
    const token = jwt.sign({ userId: user._id }, config.jssecret as string, {
      expiresIn: "1h",
    });

    // send response (exclude password from response)
    return res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    });
  } catch (err: any) {
    next(err);
  }
};

export { createUser, loginUser };
