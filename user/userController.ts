import type { NextFunction, Request, Response } from "express"
import createHttpError from "http-errors";
import user from "./userModel.js";
import User from "./userModel.js";
import bcrypt from "bcryptjs";


 const createUser = async (req:Request , res: Response , next: NextFunction)=>{
   
  const { name, email,password } = req.body;
  // console.log("reqdata " ,req.body);
  // return res.json({});

  //validation

  if(!name || !email || !password)
  {
    const error = createHttpError(400 ,"all fields are required");

    return next(error);
  }

  //database call
  const createdUser = await User.create({ name, email, password });
  if(!createdUser)
  {
    const error = createHttpError(400 ,"user already exist");

    return next(error);
  }

  //hashing password(using bcryptjs) 

   const hashedPassword = await bcrypt.hash(password, 10);
 
 }

 export {createUser};