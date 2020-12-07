const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors')
require('dotenv').config();
const authRouter = require('./routes/auth');
const techRouter = require('./routes/tech');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../index.html')));
// app.use('/test', (req, res) => {
//   console.log('test');
//   return res.status(200).send({test:'works'});
// });
app.use('/authentication', authRouter);
app.use('/technology', techRouter);
app.use('*', (req, res) => res.sendStatus(404));

// Global Error Handler
app.use(function (err, req, res, next) {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, { message: { err: err } });
  console.log('error Object', errorObj.log);

  res.status(errorObj.status).send(JSON.stringify(errorObj.message));
});

// start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;