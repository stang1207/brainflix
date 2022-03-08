const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const videosRouter = require('./routes/videos');
require('dotenv').config();
const PORT = process.env.PORT || 9000;

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/videos', videosRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
