const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  max: 160, // можно совершить максимум 100 запросов с одного IP
  windowMS: 55000, // за n минут
  message: 'В настоящий момент превышено количество запросов на сервер. Пожалуйста, попробуйте повторить позже',
});

module.exports = limiter;
