import dotenv from 'dotenv';

dotenv.config();

const CORS_WHITELIST = ['https://showrtly.onrender.com'];
const _1H_IN_MILLISECONDS = 1000 * 60 * 60;

const config = {
  PORT: process.env.PORT!,
  NODE_ENV: process.env.NODE_ENV!,
  CORS_WHITELIST,
  LOGTAIL_SOURCE_TOKEN: process.env.LOGTAIL_SOURCE_TOKEN!,
  LOGTAIL_INGESTING_HOST: process.env.LOGTAIL_INGESTING_HOST!,
  WINDOW_MS: _1H_IN_MILLISECONDS,
  MONGO_CONNECTION_URI: process.env.MONGO_CONNECTION_URI!,
};

export default config;
