const express = require('express');
const app = express();
const timeout = require('connect-timeout');

app.use(timeout('1s'), next());

module.exports = app;

// app.use(function(req, res, next) {
//     res.setTimeout(1000);
//     next();
// });