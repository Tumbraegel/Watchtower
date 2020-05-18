// Based on tutorial https://dev.to/abiodunjames/build-a-todo-app-with-nodejs-expressjs-mongodb-and-vuejs--part-1--29n7
// LAST ACCESSED: 17/05

module.exports = {
    DB: process.env.MONGO_URL ? process.env.MONGO_URL : 'mongodb://127.0.0.1:27017/watchtower',
    APP_PORT: process.env.APP_PORT ? process.env.APP_PORT : 8000,
  };