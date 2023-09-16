const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  editUserData, getUser
} = require('../controllers/user');

router.get('/me', getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
  }),
}), editUserData);

module.exports = router;
