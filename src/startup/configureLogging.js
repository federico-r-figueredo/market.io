const winston = require('winston');

module.exports = () => {
    winston.add(winston.transports.File, {
        name: 'error-file',
        filename: './logs/error/error.log',
        level: 'error',
        timestamp: true
    });
    winston.add(winston.transports.File, {
        name: 'info-file',
        filename: './logs/info/info.log',
        level: 'info',
        timestamp: true
    });
    winston.remove(winston.transports.Console);
    winston.add(winston.transports.Console, {
        formatter: function (options) {
            return (
                winston.config.colorize(options.level, '[winston]') +
                ' ' +
                winston.config.colorize(
                    options.level,
                    options.level.toUpperCase()
                ) +
                ' ' +
                (options.message ? options.message : '') +
                (options.meta && Object.keys(options.meta).length
                    ? '\n\t' + JSON.stringify(options.meta)
                    : '')
            );
        },
        handleExceptions: true
    });
};
