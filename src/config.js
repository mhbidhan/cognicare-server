require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_KEY: process.env.JWT_KEY,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  OKAYA_ADMIN_API_KEY: process.env.OKAYA_ADMIN_API_KEY,
  VONAGE_SMS_API_PRIVATE_KEY: process.env.VONAGE_SMS_API_PRIVATE_KEY,
  VONAGE_API_KEY: process.env.VONAGE_API_KEY,
  VONAGE_API_SECRET: process.env.VONAGE_API_SECRET,
  VONAGE_APP_ID: process.env.VONAGE_APP_ID,
  VONAGE_PRIVATE_KEY_PATH: './keys/private.key',
};
