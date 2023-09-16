const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies, addMovie, deleteMovie,
} = require('../controllers/movies');
const { REG_URL } = require('../utils/constants');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    description: Joi.string().required(),
    year: Joi.string().required(),
    image: Joi.string().required().pattern(REG_URL),
    trailerLink: Joi.string().required().pattern(REG_URL),
    thumbnail: Joi.string().required().pattern(REG_URL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), addMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
}), deleteMovie);

module.exports = router;
