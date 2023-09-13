const winston = require('winston');
const { format } = require('../utils/format');

module.exports = (ex, req, res, next) => {
    winston.error(ex.message);
    return res.status(500).send(format(ex.message, true));
};
