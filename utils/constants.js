const { rateLimit } = require('express-rate-limit');
const REG_URL = /^((http|https|ftp):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i;

const REG_EMAIL = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const JWT_SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'JWT_SECRET';
const MONGO_DB = process.env.MONGO_DB || 'mongodb://127.0.0.1:27017/bitfilmsdb';
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
  windows: 15 * 60 * 1000,
  limit: 100,
});

module.exports = { REG_URL, REG_EMAIL, JWT_SECRET, MONGO_DB, PORT, limiter };
