const mongoose = require('mongoose');
const { REG_URL } = require('../utils/constants');

// country — страна создания фильма. Обязательное поле-строка.
// director — режиссёр фильма. Обязательное поле-строка.
// duration — длительность фильма. Обязательное поле-число.
// year — год выпуска фильма. Обязательное поле-строка.
// description — описание фильма. Обязательное поле-строка.
// image — ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
// trailerLink — ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
// thumbnail — миниатюрное изображение постера к фильму. Обязательное поле-строка.
// Запишите её URL-адресом.
// owner — _id пользователя, который сохранил фильм. Обязательное поле.
// movieId — id фильма, который содержится в ответе сервиса MoviesExplorer.
// Обязательное поле в формате number.
// nameRU — название фильма на русском языке. Обязательное поле-строка.
// nameEN — название фильма на английском языке. Обязательное поле-строка.

const moviesSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Укажите страну создания фильма'],
  },
  director: {
    type: String,
    required: [true, 'Укажите режиссёра фильма'],
  },
  duration: {
    type: Number,
    required: [true, 'Укажите длительность фильма'],
  },
  year: {
    type: String,
    required: [true, 'Укажите год выпуска фильма'],
  },
  description: {
    type: String,
    required: [true, 'Укажите описание фильма'],
  },
  image: {
    type: String,
    required: [true, 'необходима ссылка на постер к фильму'],
    validate: {
      validator(url) {
        return REG_URL.test(url);
      },
      message: 'Неверный URL',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'необходима ссылка на трейлер фильма'],
    validate: {
      validator(url) {
        return REG_URL.test(url);
      },
      message: 'Неверный URL',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'необходима ссылка на трейлер фильма'],
    validate: {
      validator(url) {
        return REG_URL.test(url);
      },
      message: 'Неверный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: [true, 'Укажите id фильма'],
  },
  nameRU: {
    type: String,
    required: [true, 'Укажите название фильма на русском языке'],
  },
  nameEN: {
    type: String,
    required: [true, 'Укажите название фильма на английском языке'],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', moviesSchema);
