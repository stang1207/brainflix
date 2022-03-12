const express = require('express');
const app = express();

require('dotenv').config();
const path = require('path');
const cors = require('cors');
const logger = require('morgan');

const videosRouter = require('./routes/videos');
const PORT = process.env.PORT || 9000;

if (process.env.NODE_ENVIRONMENT === 'development') {
  app.use(logger('dev'));
}

app.use(cors());

//increase limit to allow sending image in base64 format
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false, limit: '5mb' }));

app.use(express.static(path.join(__dirname, 'public')));

//Video route
app.use('/videos', videosRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
