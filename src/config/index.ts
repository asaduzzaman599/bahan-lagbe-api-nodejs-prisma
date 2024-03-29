import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL as string,
  JWT_SECRET_ACCESS: process.env.JWT_SECRET_ACCESS,
  JWT_SECRET_EXPIRY: process.env.JWT_SECRET_EXPIRY,
  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS),
  DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD,
  ORIGIN_URL: process.env.ORIGIN_URL,
};