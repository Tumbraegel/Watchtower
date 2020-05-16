// Initial Setup for this folder and package.json from tutorial
// https://auth0.com/blog/how-to-make-secure-http-requests-with-vue-and-express/
// LAST ACCESSED: 15/05/2020

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`Server listening on port ${port}`)
});

// listen on the port
app.listen(port);