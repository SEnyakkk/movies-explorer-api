const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Unauthorized = require('../utils/errors/Unauthorized');
const { REG_EMAIL } = require('../utils/constants');

// email — почта пользователя, по которой он регистрируется. Это обязательное поле,
//  уникальное для каждого пользователя. Также оно должно валидироваться на соответствие
//  схеме электронной почты.
// password — **хеш пароля. Обязательное поле-строка. Нужно задать поведение по умолчанию,
//  чтобы база данных не возвращала это поле.
// name — имя пользователя, например: Александр или Мария.
//  Это обязательное поле-строка от 2 до 30 символов.

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Введите Email'],
    unique: true,
    validator(email) {
      return REG_EMAIL.test(email);
    },
    message: 'Некорректный Email',
  },
  password: {
    type: String,
    required: [true, 'Введите пароль'],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'Минимальная длина имени - 2 символа'],
    maxlength: [30, 'Максимальная длина имени - 30 символов'],
    required: [true, 'Введите Имя'],
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
