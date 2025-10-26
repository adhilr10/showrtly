import { Schema, model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  totalVisitCount: number;
  passwordResetToken: string | null;
  refreshToken: string | null;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: {
      values: ['user', 'admin'],
      message: 'Invalid role',
    },
  },
  totalVisitCount: {
    type: Number,
    default: 0,
  },
  passwordResetToken: {
    type: String,
    select: false,
    default: null
  },
  refreshToken: {
    type: String,
    select: false,
    default: null
  },
}, {
  timestamps: true
});

export const User = model<IUser>('User', userSchema);
