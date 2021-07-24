const express = require('express');
const logger = require('morgan');
const db = require("./models");
const videoRouter = require('./routes/video');
const ingestRouter = require('./routes/ingest');

const app = express();

db.sequelize.sync({ force: false })

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function(req, res, next) {
  res.send({"message":"Server Up!"})
});

app.use('/api/v1/video', videoRouter);
app.use('/api/v1/ingest', ingestRouter);

module.exports = app;
