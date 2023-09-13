const config = require('config');
const winston = require('winston');

module.exports = () => {
    try {
        winston.info('Project Name:', config.get('project'));
        winston.info('Mail Host:', config.get('mail.host'));
        winston.info('Mail Password:', config.get('mail.password'));
        winston.info('JWT Private Key:', config.get('jwt.privateKey'));
    } catch (err) {
        winston.error(err.message);
        process.exit(1);
    }
};
