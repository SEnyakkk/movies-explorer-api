const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../utils/constants');

const Unauthorized = require('../utils/errors/Unauthorized');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new Unauthorized());
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET');
  } catch (err) {
    next(new Unauthorized());
  }
  req.user = payload;
  next();
};
