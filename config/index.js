const {
    PORT, CORS_ORIGIN_WHITELIST, DATABASE_URL, JWT_MAIN_SECRET, JWT_REFRESH_SECRET,
  } = process.env;
  
  module.exports = {
    PORT,
    CORS_ORIGIN_WHITELIST,
    DATABASE_URL,
    JWT_MAIN_SECRET,
    JWT_REFRESH_SECRET,
  };
