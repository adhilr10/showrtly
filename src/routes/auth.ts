import { Router } from 'express';
import { body } from 'express-validator';
// import bcrypt from 'bcryptjs';

import register from '@/controllers/auth/register';
import validationError from '@/middlewares/validationError';
import expressRateLimit from '@/lib/expressRateLimit';

const router = Router();

router.post(
  '/register',
  expressRateLimit('basic'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),
  // .custom(async (value) => {
  //   //TODO
  // }),
  body('password')
    .trim()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isIn(['admin', 'user'])
    .withMessage('Invalid role'),
  validationError,
  register,
);

export default router;
