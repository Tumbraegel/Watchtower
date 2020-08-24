// Initial Setup for this folder and package.json from tutorial
// https://auth0.com/blog/how-to-make-secure-http-requests-with-vue-and-express/
// https://dev.to/abiodunjames/build-a-todo-app-with-nodejs-expressjs-mongodb-and-vuejs--part-1--29n7
// LAST ACCESSED: 18/05/2020

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');

const config = require('./config/db_config');
const film = require('./routes/film');
const user = require('./routes/user');
const imdbAPI = require('./routes/imdb_api');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

// Database connection
const url = config.DB;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})

app.use('/', film);
app.use('/api/auth', user);

// Run API script
//imdbAPI.runScript();

// Server listening on port
app.listen(config.APP_PORT);

module.exports = app;