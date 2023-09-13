const morgan = require('morgan');
const { morganPrefix: prefix, statusCode: status } = require('../utils/morgan');
const winston = require('winston');
const { customer, products } = require('../api');
const exception = require('../middleware/exception');

module.exports = (server, express) => {
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(express.static('public'));
    if (server.get('env') === 'development') {
        morgan.token(prefix.name, prefix.callback);
        morgan.token(status.name, status.callback);
        server.use(
            morgan(
                `:prefix-colored :method :url :status-colored :response-time ms - length|:res[content-length]`
            )
        );
        winston.info('Morgan enabled...');
    }

    server.use('/api/customer', customer);
    server.use('/api/products', products);
    server.use(exception);
};
