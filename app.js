require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { rateLimit } = require('express-rate-limit');
const cors = require('cors');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./utils/constants');
const NotFoundError = require('./utils/errors/NotFound');

const { PORT = 3000, MONGO_DB = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(cors());
app.use(limiter);

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
});

app.use('/', require('./routes/index'));

app.use('*', () => {
  throw (new NotFoundError('Страница не найдена!'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
