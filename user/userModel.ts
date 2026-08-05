import mongoose, { Schema, type Document } from 'mongoose';
import type { User } from './userTypes.js';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, 'name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
},
{
  timestamps: true,
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
