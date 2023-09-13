const mongoose = require('mongoose');
const config = require('config');
const winston = require('winston');

module.exports = () => {
    const uri = config.get('db');
    mongoose
        .connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        .then(() => winston.info(`Connected to MongoDB @ ${uri}`))
        .catch((err) => winston.error(err.message));
};
