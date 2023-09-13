const express = require('express');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const winston = require('winston');
const {
    configureLogging,
    checkConfig,
    connectToDb,
    setupMiddleware
} = require('./startup/index');

const server = express();
const port = process.env.PORT || 3000;

configureLogging();
checkConfig();
connectToDb();
setupMiddleware(server, express);

server.listen(port, () => {
    winston.info(`Express server listening @ http://localhost:${port}/api`);
});
