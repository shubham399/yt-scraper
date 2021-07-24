const express = require('express');
const logger = require('morgan');

const videoRouter = require('./routes/video');
const ingestRouter = require('./routes/ingest');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function(req, res, next) {
  res.send({"message":"Server Up!"})
});

app.use('/api/v1/video', videoRouter);
app.use('/api/v1/ingest', videoRouter);

module.exports = app;
