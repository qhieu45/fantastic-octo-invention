import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error('Could not find .env file');
}

export default {
  port: parseInt(process.env.SERVER_PORT ?? '3005', 10),

  // DB
  pgHost: process.env.POSTGRES_HOST,
  pgUser: process.env.POSTGRES_USER,
  pgPassword: process.env.POSTGRES_PASSWORD,
  pgDatabase: process.env.POSTGRES_DB,
  pgPort: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),

  // PARTNER API KEYS
  partnerApiKeys: process.env.PARTNER_API_KEYS ?? '',
};
