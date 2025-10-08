import dotenv from 'dotenv';

dotenv.config();

const CORS_WHITELIST = ['https://showrtly.onrender.com'];

const config = {
  PORT: process.env.PORT!,
  NODE_ENV: process.env.NODE_ENV!,
  CORS_WHITELIST,
};

export default config;
