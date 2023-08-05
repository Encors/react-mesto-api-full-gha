const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./middlewares/rateLimiter');
const router = require('./routes/index');
const handleErrors = require('./middlewares/handleErrors');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGODB_URL } = require('./utils/constants');

mongoose.connect(MONGODB_URL);

const app = express();

app.use(cors());
app.use(helmet());
app.use(limiter);

require('dotenv').config();

app.use(express.json());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});
app.use(handleErrors);

module.exports = app;
