const { format } = require('../utils/format');
const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token)
        return res
            .status(401)
            .send(format('Access denied. No token provided', true));

    try {
        req.user = jwt.verify(token, config.get('jwt.privateKey'));
        next();
    } catch (ex) {
        return res.status(400).send(format('Invalid token', true));
    }
};
