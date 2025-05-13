import 'dotenv/config';

const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    url: process.env.DB_ADDRESS || 'mongodb://127.0.0.1:27017/weblarek',
  },
  uploads: {
    path: process.env.UPLOAD_PATH || 'images',
    tempPath: process.env.UPLOAD_PATH_TEMP || 'temp',
  },
  cors: {
    origin: process.env.ORIGIN_ALLOW || 'http://localhost:5173',
  },
  auth: {
    refreshTokenExpiry: process.env.AUTH_REFRESH_TOKEN_EXPIRY || '7d',
    accessTokenExpiry: process.env.AUTH_ACCESS_TOKEN_EXPIRY || '1m',
  },
};

export default config;