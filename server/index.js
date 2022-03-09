const express = require('express');
const app = express();

require('dotenv').config();
const path = require('path');
const cors = require('cors');
const logger = require('morgan');

const videosRouter = require('./routes/videos');
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
