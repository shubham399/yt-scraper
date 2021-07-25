const express = require('express');
const logger = require('morgan');
const db = require("./models");
const videoRouter = require('./routes/video');
const ingestRouter = require('./routes/ingest');
const credsRouter = require('./routes/creds');

const app = express();

db.sequelize.sync({ force: false })

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res, next) {
  res.send({ "message": "Server Up!" })
});

app.use('/api/v1/video', videoRouter);
app.use('/api/v1/ingest', ingestRouter);
app.use('/api/v1/cred', credsRouter);

module.exports = app;
